import { Command } from '../command/command';
import { toggleStatus, invalidateStatus } from './row.details.service';
import { RowDetails } from './row.details';

export class RowDetailsView {
	constructor(model, table, shortcut) {
		this.model = model;

		this.toggleStatus = new Command({
			source: 'row.details.view',
			execute: row => {
				if (!row) {
					row = model.navigation().row;;
				}

				const { toggle } = model.row();
				if (toggle.execute({ row }) !== false) {
					const status = toggleStatus([row], model.row().status, model.row().mode);
					model.row({ status }, {
						source: 'row.details.view'
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

		shortcut.register([this.toggleStatus]);
	}

	status(row) {
		if (row instanceof RowDetails) {
			return null;
		}

		const { status } = this.model.row();
		const state = status.get(row);
		return state && state.expand ? 'expand' : 'collapse';
	}
}