import {Box} from '../box';
import {Cell} from '../cell';
import {Row} from '../row';
import {Column} from '../column';

export declare class VirtualBox extends Box {
	constructor();

	addCellClass(cell: Cell, name: string, force: boolean): void;
	removeCellClass(cell: Cell, name: string, force: boolean): void;
	addRowClass(row: Row, name: string, force: boolean): void;
	removeRowClass(row: Row, name: string, force: boolean): void;
	addColumnClass(column: Column, name: string, force: boolean): void;
	removeColumnClass(column: Column, name: string, force: boolean): void;
}
