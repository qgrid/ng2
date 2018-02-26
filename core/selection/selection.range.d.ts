import { CellView } from '../scene/view/cell.view';
import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';

export interface ICell {
	column: ColumnModel;
	row: any;
}

export type IBuildRows = (startCell: CellView, endCell: CellView) => any[];
export type IBuildColumns = (startCell: CellView, endCell: CellView) => ColumnModel[];
export type IBuildCells = (startCell: CellView, endCell: CellView) => ICell;
export type IBuildMix = (startCell: CellView, endCell: CellView) => any[];

export declare class SelectionRange {
	constructor(model: Model);

	model: Model;

	build(): (args: any[]) => IBuildColumns | IBuildCells | IBuildMix | IBuildRows;
	buildRows(startCell: CellView, endCell: CellView): any[];
	buildColumns(startCell: CellView, endCell: CellView): ColumnModel[];
	buildCells(startCell: CellView, endCell: CellView): ICell[];
	buildMix(startCell: CellView, endCell: CellView): any[];
}
