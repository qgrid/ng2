import {CellEditor} from './edit.cell.editor';
import {CommandManager} from '../command/command.manager';
import {Command} from '../command/command';
import {INoopResult} from '../utility/utility';
import {IEditorOptions} from '../column-type/column.model';

export declare class EditCellView {
	constructor(commandManager: CommandManager);

	editor: CellEditor;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;
	value: any;
	label: any;
	readonly fetch: INoopResult;
	readonly options: IEditorOptions;
	destroy(): void;
}
