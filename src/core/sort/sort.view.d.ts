import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';

/**
 * > Under Construction.
 */
export declare class SortView {
	constructor(model: Model);

	hover: boolean;
	toggle: Command;

	direction(column: ColumnModel): { [key: string]: ColumnModel };
	order(column: ColumnModel): number;
}
