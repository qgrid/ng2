import { View } from '../view/view';
import { EditCellView } from './edit.cell.view';
import { EditRowView } from './edit.row.view';
import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

/**
 * > Under Construction.
 */
export declare class EditView extends View {
	constructor(model: Model, table: Table, commandManager: CommandManager);

	cell: EditCellView;
	row: EditRowView;

	onDestroy(): void;
}
