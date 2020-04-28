import { EditCellView } from './edit.cell.view';
import { EditRowView } from './edit.row.view';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class EditView {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly cell: EditCellView;
	readonly row: EditRowView;
}
