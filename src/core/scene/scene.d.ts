import { ColumnView } from './view/column.view';

export declare class Scene {
	constructor(context: any);

	rows(memo: any): any[];
	columnRows(items: ColumnView[][]): ColumnView[][];
	columnLine(items: ColumnView[][]): ColumnView[];
	columnArea(items: ColumnView[][]): { left: ColumnView[], right: ColumnView[], null: ColumnView[] };
}
