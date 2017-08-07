import {View} from '../view/view';
import {ColumnModel} from "../column-type/column.model";
import {Model} from "../infrastructure/model";

export class FilterView extends View {
	constructor(model: Model);

	has(column: ColumnModel): boolean;
}