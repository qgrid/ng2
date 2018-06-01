import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

/**
 * > Under Construction.
 */
export declare class RowView {
	constructor(model: Model, table: Table, tagName: string);

	drop: Command<{ data: number, target: number }>;
	drag: Command<{ data: number }>;
	dragOver: Command<DragEvent>;

	canMove: boolean;
	canResize: boolean;
}
