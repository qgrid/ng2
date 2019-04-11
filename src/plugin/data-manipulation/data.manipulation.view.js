import { Command } from '../../core/command/command';
import { Action } from '../../core/action/action';
import { AppError } from '../../core/infrastructure/error';
import { Composite } from '../../core/infrastructure/composite';
import { isUndefined } from '../../core/utility/kit';
import * as columnService from '../../core/column/column.service';
import { set as setValue } from '../../core/services/value';
import { set as setLabel } from '../../core/services/label';

export class DataManipulationView {
	constructor(model) {
		this.model = model;

		const { styleRow, styleCell, add, delete: remove, restore } = model.dataManipulation();

		const styleState = model.style();
		const rows = Array.from(styleState.rows);
		const cells = Array.from(styleState.cells);

		let hasStyleChanges = false;
		if (styleRow) {
			rows.push(styleRow);
			hasStyleChanges = true;
		}

		if (styleCell) {
			cells.push(styleCell);
			hasStyleChanges = true;
		}

		if (hasStyleChanges) {
			model.style({ rows, cells }, { source: 'data.manipulation' })
		}

		model
			.edit({
				mode: 'cell',
				commit: Composite.command([this.commitCommand, model.edit().commit])
			})
			.style({
				rows, cells
			})
			.action({
				items: Composite.list([this.actions, model.action().items])
			});

		model.columnListChanged.watch((e, off) => {
			if (e.hasChanges('line')) {
				const rowOptionsColumn = e.state.line.find(column => column.type === 'row-options');
				if (rowOptionsColumn) {
					rowOptionsColumn.editorOptions.actions.push(...this.rowActions);
					off();
				}
			}
		});

		this.commitCommand = new Command({
			execute: e => {
				if (e.column.class !== 'data') {
					return;
				}

				const rowId = this.rowId(e.rowIndex, e.row);
				const columnId = this.columnId(e.columnIndex, e.column);
				const edited = this.changes.edited;

				let entries = edited.get(rowId);
				if (!entries) {
					entries = [];
					edited.set(rowId, entries);
				}

				let entryIndex = entries.findIndex(entry => entry.column === columnId);
				let entry = entries[entryIndex];
				if (!entry) {
					entry = {
						column: columnId,
						oldValue: e.oldValue,
						oldLabel: e.oldLabel
					};

					entryIndex = entries.length;
					entries.push(entry);
				}

				entry.newValue = e.newValue;
				entry.newLabel = e.newLabel;

				// TODO: understand if we need to track label changes?
				if (!this.hasChanges(entry.newValue, entry.oldValue)) {
					entries.splice(entryIndex, 1);
					if (!entries.length) {
						edited.delete(rowId);
					}
				}
			}
		});

		this.actions = [
			new Action(add, 'Add New Row', 'add')
		];

		this.rowActions = [
			new Action(remove, 'Delete Row', 'delete'),
			new Action(restore, 'Revert Row', 'restore'),
		];
	}

	get changes() {
		const model = this.model;
		return model.dataManipulation();
	}

	get resource() {
		return this.model.dataManipulation().resource;
	}
}
