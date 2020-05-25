import { ColumnModel } from '../column-type/column.model';
import { CellView } from '../scene/view/cell.view';
import { Command } from '../command/command';

/**
 * A class that gives access to the current cell position inside the q-grid.
 */
export declare class NavigationState {
	/**
     * Set/get a focused cell
     */
	cell: CellView | null;

	go: Command;

	shortcut: { [key: string]: string };

	prevent: Set<string>;
}
