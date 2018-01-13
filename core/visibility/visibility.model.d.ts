import {Resource} from '../resource/resource';

export interface IToolbar {
	top: boolean;
	bottom: boolean;
	right: boolean;
	left: boolean;
}

export interface IPin {
	left: boolean;
	right: boolean;
}

/**
 * A class to control visibility q-grid areas visibility .
 */
export declare class VisibilityModel {
	constructor();

	resource: Resource;

	/**
	 * Indicates if the q-grid head is visible. 
	 */
	head: boolean;

	/**
	 * Indicates if the q-grid foot is visible. 
	 */
	foot: boolean;

	/**
	 * Indicates if the q-grid body is visible. 
	 */
	body: boolean;

	/**
	 * Controls the q-grid toolbar panels are visible. 
	 * 
	 * * `'top'` show/hide top toolbar.
	 * * `'right'` show/hide right toolbar.
	 * * `'bottom'` show/hide bottom toolbar.
	 * * `'left'` show/hide left toolbar.
	 */
	toolbar: IToolbar;
	
	pin: IPin;
	plugin: object;
}
