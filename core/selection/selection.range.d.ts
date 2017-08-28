import {CellView} from '../scene/view/cell.view';
import {ColumnModel} from '../column-type/column.model';
import {Model} from '../infrastructure/model';

export interface ICell{
	column: ColumnModel;
	row: any;
}

export interface IBuildRows{
	(startCell: CellView, endCell: CellView): any[];
}

export interface IBuildColumns{
	(startCell: CellView, endCell: CellView): ColumnModel[];
}

export interface IBuildCells{
	(startCell: CellView, endCell: CellView): ICell;
}

export interface IBuildMix{
	(startCell: CellView, endCell: CellView): any[];
}

export interface IBuildResult{
	(args: any[]): IBuildResult | IBuildColumns | IBuildCells | IBuildMix;
}

export declare class SelectionRange {
	constructor(model: Model);
  model: Model;
	build(): IBuildResult;
	buildRows(startCell: CellView, endCell: CellView): any[];
	buildColumns(startCell: CellView, endCell: CellView): ColumnModel[];
	buildCells(startCell: CellView, endCell: CellView): ICell[];
	buildMix(startCell: CellView, endCell: CellView): any[];
}
