import { Command } from '../command/command';
import { getFactory as valueFactory } from '../services/value';
import { getFactory as labelFactory } from '../services/label';
import { columnFactory } from '../column/column.factory';
import { PipeUnit } from '../pipe/pipe.unit';
import { traverse } from '../node/node.service';
import { yes, identity } from '../utility/kit';

function rowspanGetNode(node, column) {
	if (node.source === column.by) {
		return node;
	}
	if (node.children.length) {
		return node.children[0];
	}
	return node;
}

function flatVisible(node, column) {
	return column.type !== 'group' || node.source === column.by;
}

function rowspanIsVisible(node, column, parent) {
	if (node.source === column.by) {
		return !parent || parent.state.expand;
	}

	if (node.children.length) {
		return rowspanIsVisible(node.children[0], column, node);
	}

	return false;
}

export class GroupView {
	constructor(model, table, service, shortcut) {
		this.model = model;
		this.table = table;
		this.valueFactory = valueFactory;

		const toggleStatus = new Command({
			source: 'group.view',
			execute: (node, column) => {
				node = node || model.navigation().row;
				column = column || model.navigation().column;

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
				node = node || model.navigation().row;
				column = column || model.navigation().column;

				node = this.getNode(node, column);
				const toggle = model.group().toggle;
				return node && node.type === 'group' && toggle.canExecute(node);
			},
			shortcut: model.group().shortcut.toggle
		});

		let shouldExpand = true;

		const toggleAllStatus = new Command({
			source: 'group.view',
			execute: () => {
				if (model.group().toggleAll.execute() !== false) {
					const { nodes } = model.view();
					const toggle = model.group().toggle;

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

		this.toggleStatus = toggleStatus;
		this.toggleAllStatus = toggleAllStatus;

		shortcut.register([toggleStatus, toggleAllStatus]);

		const createColumn = columnFactory(model);
		this.reference = {
			group: createColumn('group')
		};

		this.getNode = identity;
		this.isVisible = yes;
		model.groupChanged.watch(e => {
			if (e.hasChanges('mode')) {
				switch (e.state.mode) {
					case 'rowspan': {
						this.getNode = rowspanGetNode;
						this.isVisible = rowspanIsVisible;
						break;
					}
					case 'flat':
						this.getNode = identity;
						this.isVisible = flatVisible;
						break;
					default: {
						this.getNode = identity;
						this.isVisible = yes;
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