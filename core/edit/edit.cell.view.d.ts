import {Shortcut} from '../infrastructure/shortcut';
import {CellEditor} from './edit.cell.editor';
import {IGetFactory, IValueFactory} from '../services/value';
import {CommandManager} from '../infrastructure/command.manager';
import {ICell} from '../cell/cell';
import {INoopResult} from '../utility/utility';
import {ColumnModel, IEditorOptions} from '../column-type/column.model';
import {Command} from '../infrastructure/command';

export interface IContextFactory{
	column: ColumnModel;
	row: any;
	columnIndex: number;
	rowIndex: number;
	oldValue: any;
	newValue: any;
	oldLabel: any;
	newLabel: any;
	unit: string;
	tag: any;
	valueFactory: IValueFactory;
	labelFactory: IGetFactory;
}

export interface IShortcutOff{
	(): boolean;
}

export declare class EditCellView {
	constructor(commandManager: CommandManager);
	editor: CellEditor;
	shortcut: Shortcut;
	shortcutOff: IShortcutOff;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;
	value: any;
	label: any;
	readonly commands: Map<any, any>;
	readonly fetch: INoopResult;
	readonly options: IEditorOptions;
	contextFactory(cell: ICell, value: any, label: any, tag: any): IContextFactory;
	canEdit(cell: ICell): boolean;
	commitShortcut(): string;
	destroy(): void;
}
