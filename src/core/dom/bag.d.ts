import { ColumnModel } from '../column-type/column.model';
import { Td } from './td';
import { TrPosition } from './tr';

export declare interface BagCell extends Td {
	element: HTMLElement;
}

export declare interface BagRow extends TrPosition {
	element: HTMLElement;
}

export declare class Bag {
	constructor();

	findModel(element: HTMLElement): any;
	hasModel(element: HTMLElement): boolean;
	addRow(row: BagRow);
	addCell(cell: BagCell);
	deleteRow(row: BagRow);
	deleteCell(cell: BagCell);
}
