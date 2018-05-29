import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

/**
 * > Under Construction.
 */
export declare class RowView {
	constructor(model: Model, tagName: string);

	drop: Command;
	drag: Command;
	canMove: boolean;
}
