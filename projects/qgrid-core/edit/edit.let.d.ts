import { EditCellLet } from './edit.cell.let';
import { EditRowLet } from './edit.row.let';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class EditLet {
	constructor(plugin: GridPlugin);

	readonly cell: EditCellLet;
	readonly row: EditRowLet;
}
