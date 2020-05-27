import { Model } from '../model/model';
import { ColumnModel } from '../column-type/column.model';

export declare class Data {
	constructor(model: Model);

	model: Model;

	columns(): ColumnModel[];
	columnMap(): { [key: string]: ColumnModel };
	rows(): any[];
}
