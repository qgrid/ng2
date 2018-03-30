import { View } from '../view/view';
import { CellView } from '../scene/view/cell.view';
import { SelectionModel } from './selection.model';
import { ColumnModel } from '../column-type/column.model';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

/**
 * > Under Construction.
 */
export declare class SelectionView extends View {
	constructor(model: Model, table: Table, commandManager: CommandManager);

	readonly selection: SelectionModel;
	readonly rows: any[];
	readonly columns: ColumnModel[];

	toggleRow: Command;
	toggleCell: Command;
	toggleColumn: Command;

	selectRange(startCell: CellView, endCell: CellView, source?: string): void;
	state(item: any): boolean;
	isIndeterminate(item: any): boolean;
	destroy(): void;
}
