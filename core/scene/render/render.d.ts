import { ColumnModel } from '../../column-type/column.model';
import { Model } from '../../infrastructure/model';
import { ColumnView } from '../view/column.view';
import { RenderStrategy } from './render.strategy';

export declare class Renderer {
	constructor(model: Model);

	defaultStrategy: RenderStrategy;

	columns(row: any, pin: string): ColumnView[];
	rowspan(row: any, column: ColumnView): number;
	colspan(row: any, column: ColumnView): number;
	getValue(row: any, column: ColumnModel);
	setValue(row: any, column: ColumnModel, value: any);
}
