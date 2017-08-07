import {View} from '../view';
import {Command} from '../command';
import {flatView, toggleStatus, invalidateStatus} from './row.details.service';
import {RowDetails} from './row.details';

export class RowDetailsView extends View {
	constructor(model, table, commandManager) {
		super(model);

		this.toggleStatus = new Command({
			execute: row => {
				if (!row) {
					const cell = model.navigation().cell;
					row = cell.row;
				}

				const status = toggleStatus([row], model.row().status, model.row().mode);
				model.row({
					status: status
				}, {
					source: 'row.details.view',
					behavior: 'core'
				});
			},
			canExecute: row => {
				if (!row) {
					const cell = model.navigation().cell;
					if (cell && cell.column.type === 'row-expand') {
						row = cell.row;
					}
				}

				return !!row;
			},
			shortcut: model.row().shortcut.toggle
		});

		model.rowChanged.watch(e => {
			if (e.hasChanges('status')) {
				model.view({
					rows: flatView(table),
				}, {
					source: 'row.details.view',
					behavior: 'core'
				});
			}
		});

		model.viewChanged.watch(e => {
			if (e.tag.source !== 'row.details.view') {
				model.row({
					status: invalidateStatus(e.state.rows, model.row().status)
				});
			}
		});

		const shortcut = model.action().shortcut;
		shortcut.register(commandManager, [this.toggleStatus]);
	}

	status(row) {
		if (row instanceof RowDetails) {
			return null;
		}

		const status = this.model.row().status;
		const state = status.get(row);
		return state && state.expand ? 'expand' : 'collapse';
	}
}