import { EditCellLet } from './edit.cell.let';
import { EditRowLet } from './edit.row.let';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class EditLet {
	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);

	readonly cell: EditCellLet;
	readonly row: EditRowLet;
}
