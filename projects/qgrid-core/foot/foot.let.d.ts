import { ColumnModel } from '../column-type/column.model';
import { Model } from '../model/model';
import { GridPlugin } from '../plugin/grid.plugin';
import { ColumnView } from '../scene/view/column.view';

export declare class FootLet {
	constructor(plugin: GridPlugin);

	readonly count: number;
	readonly rows: any[];

	columns(row: any, pin: string): ColumnView[];
	invalidate(model: Model): void;
	value(column: ColumnModel): any;
	valueFactory: (column: ColumnModel) => (row: any, value?: any) => any;
}
