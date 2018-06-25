import { ColumnModel } from './column.model';
import { Aggregation, AggregationOptions } from '../services/aggregation';

export class DataColumnModel extends ColumnModel {
	isDefault?: boolean;
	aggregation?: Aggregation;
	aggregationOptions?: AggregationOptions;
}
