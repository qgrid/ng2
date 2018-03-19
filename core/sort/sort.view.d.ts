import { View } from '../view/view';
import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';

/**
 * > Under Construction.
 */
export declare class SortView extends View {
	constructor(model: any);

	hover: boolean;
	toggle: Command;

	direction(column: ColumnModel): { [key: string]: ColumnModel };
	order(column: ColumnModel): number;
}
