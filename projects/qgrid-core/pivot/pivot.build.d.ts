import { PipePivot } from '../pipe/pipe.types';
import { ColumnModel } from '../column-type/column.model';

export declare function build(
	columnMap: { [key: string]: ColumnModel },
	pivotBy: any[],
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any):
	PipePivot;
