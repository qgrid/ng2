import { Node } from './node';
import { ColumnModel } from '../column-type/column.model';

export declare function nodeBuilder(
	columnMap: { [key: string]: ColumnModel },
	groupBy: (collection: any[], iteratee: any) => object,
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any,
	level?: number):
	Node[];
