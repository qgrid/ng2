import {View} from '../view/view';
import {EditCellView} from './edit.cell.view';
import {EditRowView} from './edit.row.view';
import {CommandManager} from '../command/command.manager';

export declare class EditView extends View {
	constructor(commandManager: CommandManager);
	cell: EditCellView;
	row: EditRowView;
	onDestroy(): void;
}
