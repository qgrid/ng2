import {Model} from '../infrastructure/model';
import {ColumnModel} from '../column-type/column.model';
import {ColumnType} from '../column/column.factory';

export interface IColumnFactory {
	(model: Model): ColumnType;
}

export declare function generate(rows: any[], columnFactory: IColumnFactory, deep: boolean): ColumnModel[];
