import { Command } from '../command/command';
import { RowDetails } from './row.details';
import { takeOnce, filter } from '../rx/rx.operators';
import { toggleStatus, invalidateStatus } from './row.details.service';
import { selectRow } from '../navigation/navigation.state.selector';

export class RowDetailsLet {
	constructor(plugin, shortcut) {
		const { model, observeReply, observe, disposable } = plugin;

		this.plugin = plugin;

		this.toggleStatus = new Command({
			source: 'row.details.view',
			execute: row => {
				if (!row) {
					row = selectRow(model.navigation());
				}

				const { toggle, status, mode } = model.row();
				if (toggle.execute({ row }) !== false) {
					const newStatus = toggleStatus([row], status, mode);
					model.row({ status: newStatus }, {
						source: 'row.details.view'
					});

					observe(model.sceneChanged)
						.pipe(
							filter(e => e.hasChanges('status') && e.state.status === 'stop'),
							takeOnce()
						)
						.subscribe(e => {
							const rowStatus = newStatus.get(row);
							if (rowStatus && rowStatus.expand) {
								const index = model.view().rows.indexOf(row)
								model.focus({
									rowIndex: index + 1
								}, {
									source: 'row.details.let'
								});
							}
						});
				}
			},
			canExecute: row => {
				if (!row) {
					const { cell } = model.navigation();
					if (cell && cell.column.type === 'row-expand') {
						row = cell.row;
					}
				}

				const { toggle } = model.row();
				return !!row && toggle.canExecute({ row });
			},
			shortcut: model.row().shortcut.toggle
		});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.tag.source === 'row.details.view') {
					return;
				}

				if (e.hasChanges('rows')) {
					const { status, mode } = model.row();
					const newStatus =
						invalidateStatus(
							model.data().rows,
							status,
							mode
						);

					model.row({ status: newStatus }, {
						source: 'row.details.view'
					});
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

		shortcut.register([this.toggleStatus]);
	}

	status(row) {
		if (row instanceof RowDetails) {
			return null;
		}

		const { model } = this.plugin;
		const { status } = model.row();
		const state = status.get(row);
		return state && state.expand ? 'expand' : 'collapse';
	}
}