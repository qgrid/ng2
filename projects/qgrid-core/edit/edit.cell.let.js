import { CellEditor } from './edit.cell.editor';
import {
	EDIT_CELL_CANCEL_COMMAND_KEY,
	EDIT_CELL_CLEAR_COMMAND_KEY,
	EDIT_CELL_COMMIT_COMMAND_KEY,
	EDIT_CELL_ENTER_COMMAND_KEY,
	EDIT_CELL_EXIT_COMMAND_KEY,
	EDIT_CELL_PUSH_COMMAND_KEY,
	EDIT_CELL_RESET_COMMAND_KEY
} from '../command-bag/command.bag';
import { prob } from '../command/command';


export class EditCellLet {
	constructor(plugin) {
		const { model, observeReply, commandPalette } = plugin;

		this.plugin = plugin;

		this.editor = CellEditor.empty;
		this.requestClose = null;

		this.enter = commandPalette.get(EDIT_CELL_ENTER_COMMAND_KEY);
		this.commit = commandPalette.get(EDIT_CELL_COMMIT_COMMAND_KEY);
		this.push = commandPalette.get(EDIT_CELL_PUSH_COMMAND_KEY);
		this.cancel = commandPalette.get(EDIT_CELL_CANCEL_COMMAND_KEY);
		this.reset = commandPalette.get(EDIT_CELL_RESET_COMMAND_KEY);
		this.exit = commandPalette.get(EDIT_CELL_EXIT_COMMAND_KEY);
		this.clear = commandPalette.get(EDIT_CELL_CLEAR_COMMAND_KEY);

		observeReply(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.tag.source !== 'edit.cell.let') {
					switch (e.state.status) {
						case 'edit': {
							// this is a trick to reenter to edit mode
							model.edit({
								status: 'view'
							}, {
								source: 'edit.cell.let'
							});

							prob(this.enter, [null, 'custom']);
							break;
						}
						case 'view': {
							model.edit({
								status: 'edit'
							}, {
								source: 'edit.cell.let'
							});

							if (this.requestClose) {
								if (this.requestClose()) {
									return;
								}
							}

							prob(this.cancel);
						}
					}
				}
			});

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					if (this.requestClose) {
						if (this.requestClose()) {
							return;
						}
					}

					const editCell = this.editor.td;
					if (editCell) {
						if (editCell.column.category === 'data') {
							prob(this.commit, editCell);
						} else {
							prob(this.cancel, editCell);
						}
					}

					const { cell } = e.state;
					if (cell && (cell.column.editorOptions.trigger === 'focus')) {
						prob(this.enter, [cell, 'navigation']);
					}
				}
			});
	}

	mode(cell, status) {
		const { model } = this.plugin;
		model.edit({
			status
		}, {
			source: 'edit.cell.let'
		});

		cell.mode(status);
	}

	get fetch() {
		return this.editor.fetch;
	}

	get value() {
		return this.editor.value;
	}

	set value(value) {
		this.editor.value = value;
	}

	get label() {
		return this.editor.label;
	}

	set label(label) {
		this.editor.label = label;
	}

	get row() {
		return this.cell.row;
	}

	get column() {
		return this.cell.column;
	}

	get cell() {
		return this.editor.td;
	}

	canEdit(cell) {
		const { model } = this.plugin;

		if (cell) {
			return cell.column.canEdit && model.edit().mode === 'cell';
		}

		return false;
	}
}
