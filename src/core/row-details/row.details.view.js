import { Command } from '../command/command';
import { toggleStatus, invalidateStatus } from './row.details.service';
import { RowDetails } from './row.details';

export class RowDetailsView {
	constructor(model, table, commandManager) {
		this.model = model;

		this.toggleStatus = new Command({
			source: 'row.details.view',
			execute: row => {
				if (!row) {
					const cell = model.navigation().cell;
					row = cell.row;
				}

				const status = toggleStatus([row], model.row().status, model.row().mode);
				model.row({ status }, {
					source: 'row.details.view'
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

		model.sceneChanged.watch(e => {
			if (e.tag.source === 'row.details.view') {
				return;
			}

			if (e.hasChanges('rows')) {
				const rowState = model.row();
				const status = invalidateStatus(model.data().rows, rowState.status, rowState.mode);
				model.row({ status }, { source: 'row.details.view' });
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