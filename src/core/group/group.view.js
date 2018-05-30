import { Command } from '../command/command';
import { getFactory as valueFactory } from '../services/value';
import { getFactory as labelFactory } from '../services/label';
import { columnFactory } from '../column/column.factory';
import { PipeUnit } from '../pipe/pipe.unit';
import { traverse } from '../node/node.service';

export class GroupView {
	constructor(model, table, commandManager, service) {
		this.model = model;
		this.table = table;
		this.valueFactory = valueFactory;
		this.toggleStatus = new Command({
			source: 'group.view',
			execute: node => {
				if (!node) {
					node = model.navigation().cell.row;
				}

				const toggle = model.group().toggle;
				if (toggle.execute(node) !== false) {
					node.state.expand = !node.state.expand;
					service.invalidate('group.view', {}, PipeUnit.group);
				}
			},
			canExecute: node => {
				if (!node) {
					const cell = model.navigation().cell;
					if (cell && cell.column.type === 'group') {
						node = cell.row;
					}
				}

				const toggle = model.group().toggle;
				return node && node.type === 'group' && toggle.canExecute(node);
			},
			shortcut: model.group().shortcut.toggle
		});

		let shouldExpand = true;

		this.toggleAllStatus = new Command({
			source: 'group.view',
			execute: () => {
				if (model.group().toggleAll.execute() !== false) {
					const nodes = model.view().nodes;
					const toggle = model.group().toggle;
					const toggleStatus = this.toggleStatus;

					traverse(nodes, node => {
						if (toggleStatus.canExecute(node)) {
							if (toggle.execute(node) !== false) {
								node.state.expand = shouldExpand;
							}
						}
					});

					shouldExpand = !shouldExpand;
					service.invalidate('group.view', {}, PipeUnit.group);
				}
			},
			canExecute: () => model.group().toggleAll.canExecute()
		});

		const shortcut = model.action().shortcut;
		shortcut.register(commandManager, [this.toggleStatus, this.toggleAllStatus]);

		const createColumn = columnFactory(model);
		this.reference = {
			group: createColumn('group')
		};
	}

	count(node) {
		return node.children.length || node.rows.length;
	}

	status(node) {
		return node.state.expand ? 'expand' : 'collapse';
	}

	offset(node) {
		const groupColumn = this.column;
		return groupColumn.offset * node.level;
	}

	value(node) {
		const groupColumn = this.column;
		const getLabel = labelFactory(groupColumn);
		return getLabel(node);
	}

	get column() {
		return this.table.data.columns().find(c => c.type === 'group') || this.reference.group.model;
	}
}