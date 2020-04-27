import { Td } from './td';
import { Tr } from './tr';

export declare class Bag {
	findModel(element: HTMLElement): Tr | Td;
	hasModel(element: HTMLElement): boolean;

	addRow(row: Tr);
	addCell(cell: Td);
	deleteRow(row: Tr);
	deleteCell(cell: Td);
}
