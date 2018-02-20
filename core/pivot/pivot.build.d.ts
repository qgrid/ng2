import { IPivot } from '../pipe/pipe.item';

export declare function build(
	columnMap: { [key: string]: ColumnModel },
	pivotBy: any[],
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any):
	IPivot;
