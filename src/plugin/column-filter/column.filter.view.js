import { Command } from '../../core/command/command';
import * as columnService from '../../core/column/column.service';
import { getFactory as labelFactory } from '../../core/services/label';
import { clone } from '../../core/utility/kit';
import { Event } from '../../core/infrastructure/event';

export class ColumnFilterView {
	constructor(model, context) {
		this.model = model;
		this.key = context.key;

		this.cancelEvent = new Event();
		this.submitEvent = new Event();
		this.resetEvent = new Event();

		const filterBy = this.model.filter().by[this.key];
		this.by = new Set((filterBy && filterBy.items) || []);
		this.byBlanks = !!(filterBy && filterBy.blanks);

		this.items = [];

		Object.assign(this, this.commands);

		this.column = columnService.find(this.model.columnList().line, this.key);
		this.title = this.column.title;
		this.getValue = labelFactory(this.column);
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

					this.byBlanks = this.hasBlanks && state;
				}
			}),

			submit: new Command({
				source: 'column.filter.view',
				execute: () => {
					const model = this.model;
					const by = clone(model.filter().by);

					const filter = by[this.key] || {};
					filter.items = Array.from(this.by);
					filter.blanks = this.byBlanks;

					if (filter.items.length || filter.blanks || filter.expression) {
						by[this.key] = filter;
					}
					else {
						delete by[this.key];
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
					this.resetEvent.emit();
				}
			}),
		};
	}
}
