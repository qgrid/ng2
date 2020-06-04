import { RowEditor } from './edit.row.editor';
import { EditRowEnterCommand } from '../command-bag/edit.row.enter.command';
import { EditRowCommitCommand } from '../command-bag/edit.row.commit.command';
import { EditRowCancelCommand } from '../command-bag/edit.row.cancel.command';
import { EditRowResetCommand } from '../command-bag/edit.row.reset.command';

export class EditRowLet {
	constructor(plugin) {
		const { commandPalette } = plugin;

		this.editor = RowEditor.empty;

		this.enter = new EditRowEnterCommand(plugin);
		this.commit = new EditRowCommitCommand(plugin);
		this.cancel = new EditRowCancelCommand(plugin);
		this.reset = new EditRowResetCommand(plugin);

		commandPalette.register(this.enter);
		commandPalette.register(this.commit);
		commandPalette.register(this.cancel);
		commandPalette.register(this.reset);
	}
}
