import { Command } from '../command/command';

/**
 * Use this class to connect q-grid command and UI. Usually action represents a button, but not necessary, custom template can be [used to](/doc/features/action-bar).
 * Note that even action doesn't populate UI, command should be still executable through the keyboard shortcut.
 * 
 * ### Create an action.
 *
 * ```javascript
 * this.addRowCommand = 
 * 		new qgrid.Action(
 *			new qgrid.Command({	    
 *		  		execute: () => {
 *		     		const newRow = { id: 1, text: 'Lorem ipsum dolor sit amet' };
 *                  this.rows = this.rows.concat(newRow);
 *		   		},
 * 			}),
 * 			'Add Row'
 *		);
 * ```
 */
export declare class Action {
	constructor(
		command: Command,
		title?: string,
		icon?: string
	);

	/**
	 * User command that will be executed when:
	 *
	 * * Action button is clicked.
	 * * Custom template calls command execute method.
	 * * Command keyboard shortcut is pressed.
	 */
	command: Command;

	/**
	 * A text to show in the button, or tooltip to show if the icon property is set.
	 */
	title: string;

	/**
	 * An icon key to render on the button.
	 */
	icon: string;

	/**
	 * If custom template is used this property is required for template resolution.
	 */
	id: string;

	templateUrl: string;
}
