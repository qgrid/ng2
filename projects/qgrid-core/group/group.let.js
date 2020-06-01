import { columnFactory } from '../column/column.factory';
import { Command } from '../command/command';
import { getFactory as labelFactory } from '../services/label';
import { getFactory as valueFactory } from '../services/value';
import { PipeUnit } from '../pipe/pipe.unit';
import { preOrderDFS } from '../node/node.service';
import { selectRow, selectColumn } from '../navigation/navigation.state.selector';
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

export class GroupLet {
	constructor(plugin, shortcut) {
		const { model, observeReply, disposable, service } = plugin;

		this.plugin = plugin;
		this.valueFactory = valueFactory;

		const toggleStatus = new Command({
			source: 'group.view',
			execute: args => {
				let row = selectRow(model.navigation());
				let column = selectColumn(model.navigation());

				if (args) {
					row = args[0] || row;
					column = args[1] || column;
				}

				const node = this.getNode(row, column);
				const { toggle } = model.group();
				if (toggle.execute(node) !== false) {
					node.state.expand = !node.state.expand;
					service.invalidate({
						source: 'group.view',
						pipe: PipeUnit.group,
						why: PipeUnit.group.why
					});
				}
			},
			canExecute: args => {
				let row = selectRow(model.navigation());
				let column = selectColumn(model.navigation());

				if (args) {
					row = args[0] || row;
					column = args[1] || column;
				}

				const node = this.getNode(row, column);
				const { toggle } = model.group();
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
					const { toggle } = model.group();

					preOrderDFS(nodes, node => {
						if (toggleStatus.canExecute([node])) {
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

		observeReply(model.groupChanged)
			.subscribe(e => {
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
			});

		let canExecuteCheckSub;
		const unsubscribeCanExecuteCheck = () => {
			if (canExecuteCheckSub) {
				canExecuteCheckSub.unsubscribe();
				canExecuteCheckSub = null;
			}
		};

		disposable.add(
			unsubscribeCanExecuteCheck
		);

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('toggle')) {
					const { toggle } = e.state;
					unsubscribeCanExecuteCheck();
					canExecuteCheckSub = toggle.canExecuteCheck
						.subscribe(() => {
							this.toggleStatus.canExecuteCheck.next();
						});
				}
			});
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
		const { model } = this.plugin;

		node = this.getNode(node, column);
		const { mode } = model.group();
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