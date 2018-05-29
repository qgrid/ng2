import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { ColumnModel } from '../column-type/column.model';

/**
 * > Under Construction.
 */
export declare class HeadView {
	constructor(model: Model, table: Table, tagName: string);

	rows: any[];
	drop: Command;
	drag: Command;
	resize: Command;
	
	transfer(column: ColumnModel);
	columns(row: any, pin: string);
}
