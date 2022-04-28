import { Event } from '../../event/event';
import { Box } from '../box';
import { Cell } from '../cell';
import { Column } from '../column';
import { Row } from '../row';

export declare class VirtualBox extends Box {
	changed: Event;

	constructor();
	addCellClass(cell: Cell, name: string, force: boolean): void;
	removeCellClass(cell: Cell, name: string, force: boolean): void;
	addRowClass(row: Row, name: string, force: boolean): void;
	removeRowClass(row: Row, name: string, force: boolean): void;
	addColumnClass(column: Column, name: string, force: boolean): void;
	removeColumnClass(column: Column, name: string, force: boolean): void;
}
