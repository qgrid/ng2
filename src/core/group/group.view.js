import { Command } from '../command/command';
import { getFactory as valueFactory } from '../services/value';
import { getFactory as labelFactory } from '../services/label';
import { columnFactory } from '../column/column.factory';
import { PipeUnit } from '../pipe/pipe.unit';
import { traverse } from '../node/node.service';

// function defaultValue(node, column) {
// 	if (column) {
// 		const getLabel = labelFactory(column);
// 		return getLabel(node);
// 	}
// 	return null;
// }

// function rowspanValue(node, column) {
// 	if (node.source === column.by) {
// 		return defaultValue(node, column);
// 	}
// 	if (node.children.length) {
// 		return defaultValue(node.children[0], column);
// 	}
// 	return null;
// }

function rowspanGetNode(node, column) {
	if (node.source === column.by) {
		return node;
	}
	if (node.children.length) {
		return node.children[0];
	}
	return node;
}


export class GroupView {
	constructor(model, table, commandManager, service) {
		this.model = model;
		this.table = table;
		this.valueFactory = valueFactory;
		this.toggleStatus = new Command({
			source: 'group.view',
			execute: (node, column) => {
				node = this.getNode(node, column);
				const toggle = model.group().toggle;
				if (toggle.execute(node) !== false) {
					node.state.expand = !node.state.expand;
					service.invalidate({
						source: 'group.view',
						pipe: PipeUnit.group,
						why: PipeUnit.group.why
					});
				}
			},
			canExecute: (node, column) => {
				node = this.getNode(node, column);
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
					service.invalidate({
						source: 'group.view',
						pipe: PipeUnit.group,
						why: PipeUnit.group.why
					});
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

		this.getNode = node => node;
		model.groupChanged.watch(e => {
			if (e.hasChanges('mode')) {
				switch (e.state.mode) {
					case 'rowspan': {
						this.getNode = rowspanGetNode;
						break;
					}
					default: {
						this.getNode = node => node;
						break;
					}
				}
			}
		})
	}

	count(node, column) {
		node = this.getNode(node, column);
		return node.children.length || node.rows.length;
	}

	status(node, column) {
		node = this.getNode(node, column);
		return node.state.expand ? 'expand' : 'collapse';
	}

	offset(node, column) {
		node = this.getNode(node, column);
		const { mode } = this.model.group();
		switch (mode) {
			case 'nest':
			case 'subhead': {
				return column ? column.offset * node.level : 0;
			}
			default: {
				return 0;
			}
		}
	}

	value(node, column) {
		node = this.getNode(node, column);
		if (column) {
			const getLabel = labelFactory(column);
			return getLabel(node);
		}
		return null;
	}
	
}