import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { ColumnModel } from '../column-type/column.model';
import { ColumnView } from '../scene/view/column.view';

/**
 * > Under Construction.
 */
export declare class HeadView {
	constructor(model: Model, table: Table, tagName: string);

	drop: Command<{ dragData: string }>;
	drag: Command<{ dragData: string }>;

	resize: Command;

	rows: ColumnView[][];
	columns(row: any, pin: string);
}
