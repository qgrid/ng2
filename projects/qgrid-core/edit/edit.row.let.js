import { RowEditor } from './edit.row.editor';
import {
	EDIT_ROW_CANCEL_COMMAND_KEY,
	EDIT_ROW_COMMIT_COMMAND_KEY,
	EDIT_ROW_ENTER_COMMAND_KEY,
	EDIT_ROW_RESET_COMMAND_KEY
} from '../command-bag/command.bag';

export class EditRowLet {
	constructor(plugin) {
		const { commandPalette } = plugin;

		this.editor = RowEditor.empty;

		this.enter = commandPalette.get(EDIT_ROW_ENTER_COMMAND_KEY);
		this.commit = commandPalette.get(EDIT_ROW_COMMIT_COMMAND_KEY);
		this.cancel = commandPalette.get(EDIT_ROW_CANCEL_COMMAND_KEY);
		this.reset = commandPalette.get(EDIT_ROW_RESET_COMMAND_KEY);
	}
}
