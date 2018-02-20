import { Node } from './node';

export declare function nodeBuilder(
	columnMap: { [key: string]: ColumnModel },
	groupBy: (collection: any[], iteratee: any) => object,
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any,
	level: number = 0):
	Node[];
