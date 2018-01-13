import {Command} from '../command/command';

/**
 * A class to connect Command and UI.
 */
export declare class Action {
	constructor(command: Command, title?: string, icon?: string);

	/**
	 * User command that will be executed when:
	 * * Action button is clicked.
	 * * Command shortcut keys are pressed.
	 */
	command: Command;

	/**
	 * Text that will be shown as a tooltip for the action button.
	 */
	title: string;

	/**
	 * Icon key that will be rendered as a button.
	 */
	icon: string;
}