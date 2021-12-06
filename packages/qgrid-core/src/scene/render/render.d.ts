import { ColumnModel, ColumnModelPin } from '../../column-type/column.model';
import { ColumnView } from '../view/column.view';
import { RenderStrategy } from './render.strategy';
import { GridPlugin } from '../../plugin/grid.plugin';

export declare class Renderer {
	constructor(plugin: GridPlugin);

	defaultStrategy: RenderStrategy;

	columns(row: any, pin: ColumnModelPin, rowIndex: number): ColumnView[];
	rowspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;
	colspan(row: any, column: ColumnView, rowIndex: number, columnIndex: number): number;

	getValue(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
	setValue(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;

	getLabel(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
	setLabel(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;

	readonly rows: { left: any[], right: any[], mid: any[] };
}
