import { Model } from '../infrastructure/model';
import { Action } from '../action/action';
import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';

/**
 * Specific options for the cell edit mode.
 */
export interface EditorOptions {

	/**
	 * Says when cell should go to the edit mode.
	 *
	 * * `click` edit mode activates when user clicks on cell.
	 * * `custom` if user defines own edit mode trigger, like button for reference column edit, this option should be used.
	 * * `focus` edit mode activates when cell receives focus.
	 */
	trigger?: string;

	/**
	 * Defines navigation behavior when cell is in edit mode.
	 *
	 * * `control` when cell is in edit mode, keyboard navigation events are disabled(in general, `tab` and `shift+tab` still works).
	 * * `transparent` when cell is in edit mode, keyboard navigation event are still applicable.
	 */
	cruise?: string;

	/**
	 * q-grid model factory, can be used by reference column to draw a another q-grid in edit cell mode.
	 */
	modelFactory?: (context: {
		row: any,
		column: ColumnModel,
		getValue: (row: any) => any,
		reference: { commit: Command, cancel: Command, value: any }
	}) => Model;

	/**
	 * Can be used by e.g. `auto-complete` editor to populate list of items.
	 */
	fetch?: () => Promise<any> | { subscribe: (x: any) => void } | any;

	/**
	 * List of actions, can be used by row-options column to draw menu with commands.
	 */
	actions?: Action[];

	label?: any;
	value?: any;
}
