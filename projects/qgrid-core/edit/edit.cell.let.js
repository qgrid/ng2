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
							model.edit({
								status: 'view'
							}, {
								source: 'edit.cell.let'
							});

							if (this.enter.canExecute()) {
								this.enter.execute();
							}

							break;
						}
						case 'view': {
							model.edit({ status: 'edit' }, { source: 'edit.cell.let' });
							if (this.requestClose) {
								if (this.requestClose()) {
									return;
								}
							}

							if (this.cancel.canExecute()) {
								this.cancel.execute();
							}
						}
					}
				}
			});

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					const oldCell = this.editor.td;
					if (oldCell) {
						if (oldCell.column.category === 'data') {
							if (this.commit.canExecute(oldCell)) {
								this.commit.execute(oldCell);
							}
						} else {
							if (this.cancel.canExecute(oldCell)) {
								this.cancel.execute(oldCell);
							}
						}
					}

					const { cell: newCell } = e.state;
					if (newCell &&
						(newCell.column.editorOptions.trigger === 'focus')) {
						if (this.enter.canExecute(newCell)) {
							this.enter.execute(newCell);
						}
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
