import {View} from '../view/view';
import {CommandManager} from '../command/command.manager';
import {Cell} from '../cell/cell';
import {SelectionState} from './state/selection.state';
import {SelectionModel} from './selection.model';
import {ColumnModel} from '../column-type/column.model';

export interface IToggleResult {
	(): void;
}

export interface ISelectResult {
	(): void;
}

export declare class SelectionView extends View {
	constructor(commandManager: CommandManager);

	selectRange(startCell: Cell, endCell: Cell): void;
	toggle(items: any[]): IToggleResult;
	select(items: any[], state: SelectionState): ISelectResult;
	state(item: any): boolean;
	isIndeterminate(item: any): boolean;
	destroy(): void;
	readonly selection: SelectionModel;
	readonly rows: any[];
	readonly columns: ColumnModel[];
}
