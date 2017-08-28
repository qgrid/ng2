import {ColumnModel} from '../column-type/column.model';

export declare class IBagCell {
	element: HTMLElement;
	rowIndex: Number;
	columnIndex: Number;
	row: any;
	column: ColumnModel;
}

export declare class IBagRow {
	element: HTMLElement;
	index: Number;
}

export declare class Bag {
	constructor();

	findModel(element: HTMLElement): any;

	hasModel(element: HTMLElement): boolean;

	addRow(row: IBagRow) ;

	addCell(cell: IBagCell);

	deleteRow(row: IBagRow);

	deleteCell(cell: IBagCell);
}
