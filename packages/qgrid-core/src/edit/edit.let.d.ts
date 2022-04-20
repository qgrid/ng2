import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { EditCellLet } from './edit.cell.let';
import { EditRowLet } from './edit.row.let';

export declare class EditLet {
	readonly cell: EditCellLet;
	readonly row: EditRowLet;

	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);
}
