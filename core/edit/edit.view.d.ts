import {View} from '../view/view';
import {EditCellView} from './edit.cell.view';
import {EditRowView} from './edit.row.view';
import {Table} from "../dom/table";
import {CommandManager} from "../infrastructure/command.manager";
import {Model} from "../infrastructure/model";

export declare class EditView extends View {
	constructor(model: Model, table: Table, commandManager: CommandManager);

	cell: EditCellView;
	row: EditRowView;

	onDestroy(): void;
}