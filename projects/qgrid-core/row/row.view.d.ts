import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

export declare class RowView {
	constructor(model: Model, table: Table, tagName: string);

	drop: Command<{ dragData: number }>;
	drag: Command<{ dragData: number }>;

	canMove: boolean;
	canResize: boolean;
}
