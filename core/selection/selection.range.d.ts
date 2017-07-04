import {Cell} from "../cell/cell";
import {ColumnModel} from "../column-type/column.model";
import {Model} from "../infrastructure/model";

export interface ICellObj{
	column: ColumnModel;
	row: any;
}

export interface IBuildRows{
	(startCell: Cell, endCell: Cell): any[];
}

export interface IBuildColumns{
	(startCell: Cell, endCell: Cell): ColumnModel[];
}

export interface IBuildCells{
	(startCell: Cell, endCell: Cell): ICellObj;
}

export interface IBuildMix{
	(startCell: Cell, endCell: Cell): any[];
}

export interface IBuildResult{
	(args: any[]): IBuildResult | IBuildColumns | IBuildCells | IBuildMix;
}

export declare class SelectionRange {
	constructor(public model: Model);

	build(): IBuildResult;

	buildRows(startCell: Cell, endCell: Cell): any[];

	buildColumns(startCell: Cell, endCell: Cell): ColumnModel[];

	buildCells(startCell: Cell, endCell: Cell): ICellObj;

	buildMix(startCell: Cell, endCell: Cell): any[];
}