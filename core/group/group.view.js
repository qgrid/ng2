import {View} from '../view';
import {Command} from '../command';
import {flatView as nodeFlatView} from '../node';
import {getFactory as valueFactory} from '../services/value';

export class GroupView extends View {
	constructor(model, commandManager) {
		super(model);

		this.valueFactory = valueFactory;
		this.toggleStatus = new Command({
			execute: node => {
				if (!node) {
					node = model.navigation().cell.row;
				}

				node.state.expand = !node.state.expand;
				const view = model.view;
				const nodes = view().nodes;
				view({rows: nodeFlatView(nodes)}, {behavior: 'core', source: 'group.view'});
			},
			canExecute: node => {
				if (!node) {
					const cell = model.navigation().cell;
					if (cell && cell.column.type === 'group') {
						node = cell.row;
					}
				}

				return node && node.type === 'group';
			},
			shortcut: model.group().shortcut.toggle
		});

		const shortcut = model.action().shortcut;
		shortcut.register(commandManager, [this.toggleStatus]);
	}

	count(node) {
		return node.children.length || node.rows.length;
	}

	status(node) {
		return node.state.expand ? 'expand' : 'collapse';
	}

	offset(node) {
		const groupColumn = (this.model.view().columns[0] || []).find(c => c.model.type === 'group');
		if (groupColumn) {
			return groupColumn.model.offset * node.level;
		}

		return 0;
	}

	value(node) {
		return node.key;
	}
}