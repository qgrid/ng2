import { clone } from '@qgrid/core/utility/kit';
import { Command } from '@qgrid/core/command/command';
import { Event } from '@qgrid/core/event/event';
import { getFactory as labelFactory } from '@qgrid/core/services/label';

export class ColumnFilterPlugin {
	constructor(plugin, context) {
		const { model } = plugin;

		this.plugin = plugin;
		this.column = context.column;

		this.cancelEvent = new Event();
		this.submitEvent = new Event();
		this.resetEvent = new Event();

		const filterBy = model.filter().by[this.column.key];

		this.by = new Set((filterBy && filterBy.items) || []);
		this.byBlanks = !!(filterBy && filterBy.blanks);

		let defaultOperator = model.filter().operatorFactory(this.column)[0] || 'contains';
		if (filterBy && filterBy.items && filterBy.items.length) {
			defaultOperator = 'contains';
		}

		this.items = [];
		this.operator = filterBy && filterBy.expression && filterBy.expression.op || defaultOperator;
		this.value = filterBy && filterBy.expression && filterBy.expression.right || null;
		this.title = this.column.title;
		this.getValue = labelFactory(this.column);

		Object.assign(this, this.commands);

		this.changeOperator.execute(this.operator);
	}

	state(item) {
		return this.by.has(item);
	}

	stateAll() {
		return this.items.every(this.state.bind(this)) && (!this.hasBlanks || this.byBlanks);
	}

	isIndeterminate() {
		return !this.stateAll() && (this.items.some(this.state.bind(this)) || this.byBlanks);
	}

	isEmpty() {
		return !!this.by.size || this.byBlanks;
	};

	get commands() {
		return {
			toggle: new Command({
				source: 'column.filter.view',
				execute: (item) => {
					if (this.by.has(item)) {
						this.by.delete(item);
					}
					else {
						this.by.add(item);
					}

					this.by = new Set(this.by);
				}
			}),
			toggleAll: new Command({
				source: 'column.filter.view',
				execute: search => {
					const state = !this.stateAll();
					if (state) {
						for (let item of this.items) {
							this.by.add(item);
						}
					}
					else {
						if (search) {
							for (let item of this.by) {
								if (this.items.indexOf(item) >= 0) {
									this.by.delete(item);
								}
							}
						}
						else {
							this.by.clear();
						}
					}

					this.by = new Set(this.by);
					this.byBlanks = this.hasBlanks && state;
				}
			}),

			changeOperator: new Command({
				source: 'column.filter.view',
				execute: (op) => {
					this.operator = op;

					let { value } = this;
					switch (op) {
						case 'between': {
							if (!Array.isArray(value)) {
								this.value = [value];
							}
							break;
						}
						default: {
							if (Array.isArray(value)) {
								this.value = value[0];
							}
							break;
						}
					}
				}
			}),

			submit: new Command({
				source: 'column.filter.view',
				execute: () => {
					const { model } = this.plugin;
					const by = clone(model.filter().by);

					const filter = by[this.column.key] || {};

					filter.items = Array.from(this.by);
					filter.blanks = this.byBlanks;

					if (this.operator === 'contains') {
						delete filter.expression;
					} else {
						filter.items = [];

						if (this.operator.startsWith('is') || this.value) {
							filter.expression = {
								kind: 'condition',
								op: this.operator,
								left: this.column.key,
								right: this.value,
							};
						} else {
							delete filter.expression;
						}
					}

					if ((filter.items && filter.items.length) || filter.blanks || filter.expression) {
						by[this.column.key] = filter;
					}
					else {
						delete by[this.column.key];
					}

					model.filter({ by }, { source: 'column.filter.view' });

					this.submitEvent.emit();
				}
			}),

			cancel: new Command({
				source: 'column.filter.view',
				execute: () => this.cancelEvent.emit()
			}),

			reset: new Command({
				source: 'column.filter.view',
				execute: () => {
					this.by = new Set();
					this.byBlanks = false;
					this.value = this.operator === 'between' ? [] : null;
					this.resetEvent.emit();
				}
			}),
		};
	}
}
