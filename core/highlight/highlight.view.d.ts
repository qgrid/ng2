import {View} from '../view/view';
import {Command} from '../infrastructure/command';
import {CellSelector} from '../cell/cell.selector';
import {SelectionService} from '../selection/selection.service';
import {ColumnModel} from '../column-type/column.model';
import {Cell} from '../cell/cell';
import {INoopResult} from '../utility/utility';

export declare class HighlightView extends View {
	constructor(timeout: number);
	timeout: number;
	cellSelector: CellSelector;
	selectionService: SelectionService;
	column: Command;
	row: Command;
	invalidateColumnHover(dispose: ColumnModel[]): ColumnModel[];
	invalidateRowHover(dispose: any[]): any[];
	invalidateSortBy(dispose: any[]): any[];
	invalidateSelection(dispose: any[]): Cell[];
	columnIndex(key: string): number;
	highlightColumn(key: string, cls: string): INoopResult;
	blurColumn(key: string, cls: string): INoopResult;
	highlightRow(index: number, cls: string): INoopResult;
	blurRow(index: number, cls: string): INoopResult;
	highlightCell(cell: Cell, cls: string): INoopResult;
	blurCell(cell: Cell, cls: string): INoopResult;
}
