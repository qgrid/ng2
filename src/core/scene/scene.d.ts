import {ColumnView} from '../column/column.view';

export declare class Scene {
	constructor(context: any);

	rows(memo: any): any[];
	columnRows(items: ColumnView[][]): ColumnView[][];
	columnLine(items: ColumnView[][]): ColumnView[];
	columnArea(items: ColumnView[][]): any;
}
