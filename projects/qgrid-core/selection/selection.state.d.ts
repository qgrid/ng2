import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';

/**
 * Controls if click on the q-grid body should select row or not.
 *
 * * `'body'` click on the q-grid body leads to row select/unselect.
 * * `'custom'` only select checkbox click leads to row select/unselect.
 */
export declare type SelectionStateArea = 'custom' | 'body';

/**
 * Selection primitive.
 *
 * * `'row'` user can select rows by clicking on checkboxes or q-grid body area.
 * * `'cell'` `default` user can select cells clicking on the q-grid body area.
 * * `'column'` user can select columns by clicking on the q-grid body area.
 * * `'mix'` user can select both rows and cells, rows are selectable by clicking on row-indicator column.
 */
export declare type SelectionStateUnit = 'row' | 'cell' | 'column' | 'mix';

/**
 * Selection mode.
 *
 * * `'single'`
 * * `'multiple'`
 * * `'range'`
 * * `'singleOnly'`
 */
export declare type SelectionStateMode = 'single' | 'multiple' | 'range' | 'singleOnly';

/**
 * A class that allows to control selection function of the q-grid.
 */
export declare class SelectionState {
	/**
	 * Controls if click on the q-grid body should select row or not.
	 */
	area: SelectionStateArea;

	/**
	 * Selection primitive.
	 */
	unit: SelectionStateUnit;

	/**
	 * Selection mode.
	 */
	mode: SelectionStateMode;

	/**
	 * List of selected items.
	 */
	items: any[];

	/**
	 * Set of map function, that can convert column and row to necessary format.
	 *
	 * * `'column'` custom column key will be stored in the items property.
	 * * `'row'` custom row id will be stored in the items property.
	 */
	rowKey: (row: any) => any;
	columnKey: (column: ColumnModel) => any;

	/**
	 * Keyboard shortcuts to control selection behavior. Changed.
	 */
	shortcut: { [key: string]: string };

	/**
	 * Allows to disable selection and execute action on selection changed from ui.
	 */
	toggle: Command;
}
