import { CellView } from '../scene/view/cell.view';
import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';

export interface ICell {
	column: ColumnModel;
	row: any;
}

export declare class SelectionRange {
	constructor(model: Model);

	model: Model;

	build(): (args: any[]) => (startCell: CellView, endCell: CellView) => any;
	buildRows(startCell: CellView, endCell: CellView): any[];
	buildColumns(startCell: CellView, endCell: CellView): ColumnModel[];
	buildCells(startCell: CellView, endCell: CellView): ICell[];
	buildMix(startCell: CellView, endCell: CellView): any[];
}
