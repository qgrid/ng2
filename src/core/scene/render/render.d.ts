import { ColumnModel } from '../../column-type/column.model';
import { Model } from '../../infrastructure/model';
import { ColumnView } from '../view/column.view';
import { RenderStrategy } from './render.strategy';

export declare class Renderer {
	constructor(model: Model);

	defaultStrategy: RenderStrategy;

	columns(row: any, pin: string, rowIndex: number): ColumnView[];
	rowspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;
	colspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;

	getValue(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
	setValue(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;

	getLabel(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
	setLabel(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;

	readonly rows: { left: any[], right: any[], null: any[] };
}
