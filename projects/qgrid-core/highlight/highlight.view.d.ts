import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';


export declare class HighlightView {
	constructor(model: Model, table: Table);

	column: Command;
	row: Command;
	cell: Command;
}
