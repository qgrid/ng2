import {ColumnModel} from './column.model';
import {Aggregation} from '../services/aggregation';

export interface IAggregationOptions{
	distinct: boolean;
	separator: string;
}

export class DataColumnModel extends ColumnModel {
	constructor();
	isDefault: boolean;
	aggregation: Aggregation;
	aggregationOptions: IAggregationOptions;
}