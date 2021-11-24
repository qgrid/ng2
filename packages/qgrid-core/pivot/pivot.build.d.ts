import { ColumnModel } from '../column-type/column.model';
import { PipePivot } from '../pipe/pipe.types';

export declare function buildPivot(
	columnMap: { [key: string]: ColumnModel },
	pivotBy: any[],
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any):
	PipePivot;
