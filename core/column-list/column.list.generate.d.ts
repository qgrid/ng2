import {ColumnModel} from '../column-type/column.model';
import {Model} from '../infrastructure/model';

export interface IColumnFactory {
	(type: string): ColumnModel;
}

export declare function generateFactory(model: Model): (rows: any[], columnFactory: IColumnFactory, deep: boolean) => ColumnModel[];
