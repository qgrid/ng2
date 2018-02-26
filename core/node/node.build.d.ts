import { Node } from './node';
import { ColumnModel } from '../column-type/column.model';

export interface ILodashGroupBy {
	(collection: any[], iteratee: any): object;
}

export declare function nodeBuilder(
	columnMap: { [key: string]: ColumnModel },
	groupBy: ILodashGroupBy,
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any,
	level?: number): Node[];
