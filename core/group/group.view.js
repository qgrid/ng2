import {View} from '../view';
import {Command} from '../command';
import {getFactory as valueFactory} from '../services/value';
import {getFactory as labelFactory} from '../services/label';
import {columnFactory} from '../column/column.factory';
import {PipeUnit} from '../pipe/pipe.unit';

export class GroupView extends View {
	constructor(model, table, commandManager, service) {
		super(model);

		this.table = table;
		this.valueFactory = valueFactory;
		this.toggleStatus = new Command({
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

		const shortcut = model.action().shortcut;
		shortcut.register(commandManager, [this.toggleStatus]);

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
		return labelFactory(groupColumn)(node);
	}

	get column() {
		return this.table.data.columns().find(c => c.type === 'group') || this.reference.group.model;
	}
}