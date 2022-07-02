import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { RowEditor } from './edit.row.editor';

export declare class EditRowLet {
  readonly editor: RowEditor;
  readonly enter: Command<any>;
  readonly commit: Command<any>;
  readonly cancel: Command<any>;
  readonly reset: Command<any>;

  constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);
}
