import { Model } from '../infrastructure/model';

/**
 * Specific options for the cell edit mode.
 */
export class EditorOptions {

	/**
	 * Says when cell should go to the edit mode.
	 *
	 * * `'click'` edit mode activates when user clicks on cell.
	 * * `'custom'` if user defines own edit mode trigger, like button for reference column edit, this option should be used.
	 * * `'focus'` edit mode activates when cell recieves focus.
	 */
	trigger: string;

	/**
	 * Defines navigation behavior when cell is in edit mode.
	 *
	 * * `'control'` when cell is in edit mode, keyboard navigation events are disabled(in general, `tab` and `shift+tab` still works).
	 * * `'transparent'` when cell is in edit mode, keyboard navigation event are still applicable.
	 */
	cruise: string;

	/**
	 * q-grid model factory, can be used by reference column to draw a anpther q-grid in edit cell mode.
	 */
	modelFactory: () => Model;

	/**
	 * Can be used by e.g. `auto-complete` editor to populate list of items.
	 */
	fetch: () => any | Promise<any> | any;

	label: any;
	value: any;
}
