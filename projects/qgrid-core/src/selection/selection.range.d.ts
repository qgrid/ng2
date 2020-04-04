import { Td } from '../dom/td';
import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';

export declare class SelectionRange {
	constructor(model: Model);

	model: Model;

	build(): (args: any[]) => (startCell: Td, endCell: Td) => any;
	buildRows(startCell: Td, endCell: Td): any[];
	buildColumns(startCell: Td, endCell: Td): ColumnModel[];
	buildCells(startCell: Td, endCell: Td): Array<{ column: ColumnModel, row: any }>;
	buildMix(startCell: Td, endCell: Td): any[];
}
