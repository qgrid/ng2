import { Command } from '../command/command';

/**
 * A class to connect the q-grid [command](/doc/api/command.html) with user interface.
 * Usually action represents button in UI. If user action doesn't populate UI attributes like `title` or `icon`,
 * command can be still available through keyboard shortcut.
 *
 * ### Suggested Links
 *
 * * [Action Model](/doc/api/action-model.html)
 * * [Command](/doc/api/command.html)
 * * [Action Bar](/doc/feature/action.html)
 */
export declare class Action {
	constructor(command: Command, title?: string, icon?: string);

	/**
	 * User command that will be executed when:
	 *
	 * * Action button is clicked.
	 * * Command shortcut keys are pressed.
	 */
	command: Command;

	/**
	 * Text that will be shown as a tooltip for the action button, if icon property
	 * is not set this text can be shown as a label(depends on [action bar](/doc/feature/action.html)
	 * plugin implementation).
	 */
	title: string;

	/**
	 * Icon key that will be rendered as a button image.
	 */
	icon: string;

	id: string;

	templateUrl: string;
}
