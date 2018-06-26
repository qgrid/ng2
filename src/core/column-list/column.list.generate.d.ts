import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';

export declare function generateFactory(model: Model):
	(rows: any[], columnFactory: (type: string) => ColumnModel, deep: boolean) => ColumnModel[];

export declare function generate(settings: any): ColumnModel[];
