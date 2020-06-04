import { CellEditor } from './edit.cell.editor';
import { EditCellEnterCommand } from '../command-bag/edit.cell.enter.command';
import { EditCellCommitCommand } from '../command-bag/edit.cell.commit.command';
import { EditCellPushCommand } from '../command-bag/edit.cell.push.command';
import { EditCellCancelCommand } from '../command-bag/edit.cell.cancel.command';
import { EditCellResetCommand } from '../command-bag/edit.cell.reset.command';
import { EditCellExitCommand } from '../command-bag/edit.cell.exit.command';
import { EditCellClearCommand } from '../command-bag/edit.cell.clear.command';


export class EditCellLet {
	constructor(plugin) {
		const { model, observeReply, commandPalette } = plugin;

		this.plugin = plugin;

		this.editor = CellEditor.empty;
		this.requestClose = null;

		this.enter = new EditCellEnterCommand(plugin);
		this.commit = new EditCellCommitCommand(plugin);
		this.push = new EditCellPushCommand(plugin);
		this.cancel = new EditCellCancelCommand(plugin);
		this.reset = new EditCellResetCommand(plugin);
		this.exit = new EditCellExitCommand(plugin);
		this.clear = new EditCellClearCommand(plugin);

		commandPalette.register(this.enter);
		commandPalette.register(this.commit);
		commandPalette.register(this.push);
		commandPalette.register(this.cancel);
		commandPalette.register(this.reset);
		commandPalette.register(this.exit);
		commandPalette.register(this.clear);

		observeReply(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.tag.source !== 'edit.cell.let') {
					if (e.changes.status.newValue === 'edit') {
						model.edit({ status: 'view' }, { source: 'edit.cell.let' });
						if (this.enter.canExecute()) {
							this.enter.execute();
						}
					} else if (e.changes.status.newValue === 'view') {
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
