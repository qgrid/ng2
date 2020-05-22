import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';
import { Command } from '../command/command';

export class FilterView {
	constructor(model: Model);

	filter: Command<any>;
	has(column: ColumnModel): boolean;
	value(column: ColumnModel): any;
}
