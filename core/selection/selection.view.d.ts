import {View} from '../view/view';
import {SelectionRange} from './selection.range';
import {SelectionService} from './selection.service';
import {SelectionCommandManager} from './selection.command.manager';
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';
import {CommandManager} from '../infrastructure/command.manager';
import {ISelectionStateFactoryShape} from './state/selection.state.factory';
import {Cell} from '../cell/cell';
import {SelectionState} from './state/selection.state';
import {SelectionModel} from './selection.model';
import {ColumnModel} from '../column-type/column.model';
import {Shortcut} from '../infrastructure/shortcut';

export interface IToggleResult {
	(): void;
}

export interface ISelectResult {
	(): void;
}

export declare class SelectionView extends View {
	constructor(commandManager: CommandManager);
	commandManager: CommandManager;
	selectionState: ISelectionStateFactoryShape;
	selectionRange: SelectionRange;
	selectionCommandManager: SelectionCommandManager;
	shortcut: Shortcut;
	shortcutOff: boolean;
	toggleRow: any;
	toggleColumn: any;
	toggleCell: any;
	reset: any;
	readonly commands: Map<any, any>;
	selectRange(startCell: Cell, endCell: Cell): void;
	toggle(items: any[]): IToggleResult;
	select(items: any[], state: SelectionState): ISelectResult;
	state(item: any): boolean;
	isIndeterminate(item: any): boolean;
	destroy(): void;
	readonly selection: SelectionModel;
	readonly rows: any[];
	readonly columns: ColumnModel[];
	navigateTo(rowIndex: number, columnIndex: number): void;
}
