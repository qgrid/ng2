import { EditCellView } from './edit.cell.view';
import { EditRowView } from './edit.row.view';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

export declare class EditView {
	constructor(model: Model, table: Table, shortcut: { register: (commands: Command[]) => void });

	cell: EditCellView;
	row: EditRowView;
}
