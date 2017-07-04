import {Shortcut} from '../infrastructure/shortcut';
import {CellEditor} from './edit.cell.editor';
import {getFactory as valueFactory} from '../services/value';
import {getFactory as labelFactory} from '../services/label';
import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";
import {CommandManager} from "../infrastructure/command.manager";
import {ICell} from "../cell/cell";
import {INoopResult} from "../utility/utility";
import {IEditorOptions} from "../column-type/column.model";
import {Command} from "../infrastructure/command";

export interface IContextFactory{
	column: ICell.column,
	row: ICell.row,
	columnIndex: ICell.columnIndex,
	rowIndex: ICell.rowIndex,
	oldValue: ICell.value,
	newValue: ICell.value,
	oldLabel: ICell.label,
	newLabel: ICell.label,
	unit: string,
	tag: any,
	valueFactory: valueFactory,
	labelFactory: labelFactory
}

export interface IShortcutOff{
	(): boolean;
}

export declare class EditCellView {
	constructor(public model: Model, public table: Table, commandManager: CommandManager);

	editor: CellEditor;
	shortcut: Shortcut;
	commands: Map;
	shortcutOff: IShortcutOff;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;

	readonly commands: Map;

	contextFactory(cell: ICell, value: any, label: any, tag: any): IContextFactory;

	readonly fetch: INoopResult;

	readonly value: any;

	set value(value: any);

	readonly label: any;

	set label(label: any);

	canEdit(cell: ICell): boolean;

	commitShortcut(): string;

	readonly options: IEditorOptions;

	destroy(): void;
}