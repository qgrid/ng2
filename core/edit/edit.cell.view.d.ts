import {CellEditor} from './edit.cell.editor';
import {CommandManager} from '../command/command.manager';
import {Command} from '../command/command';
import {INoopResult} from '../utility/utility';
import {IEditorOptions} from '../column-type/column.model';
import {Table} from '../dom/table';
import {Model} from '../infrastructure/model';
import {View} from '../view/view';

export declare class EditCellView extends View {
	constructor(model: Model, table: Table, commandManager: CommandManager);

	editor: CellEditor;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;
	value: any;
	label: any;
	readonly fetch: INoopResult;
	readonly options: IEditorOptions;
}
