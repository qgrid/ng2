import { View } from '../view/view';
import { Command } from '../command/command';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

/**
 * > Under Construction.
 */
export declare class HighlightView extends View {
	constructor(model: Model, table: Table);

	column: Command;
	row: Command;
}
