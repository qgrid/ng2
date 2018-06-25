import { View } from './view';
import { Data } from './data';
import { Head } from './head';
import { Body } from './body';
import { Foot } from './foot';
import { BoxContext } from './box';

/**
 * Use this class to get access to low level dom elements and functions of the qgrid.
 */
export declare class Table {
	constructor(markup: { [key: string]: HTMLElement }, context: BoxContext);

	readonly markup: { [key: string]: HTMLElement };
	readonly context: BoxContext;

	/**
	 * Contains dom selectors for the q-grid header component.
	 */
	readonly head: Head;

	/**
	 * Contains dom selectors for the q-grid body component.
	 */
	readonly body: Body;

	/**
	 * Contains dom selectors for the q-grid footer component.
	 */
	readonly foot: Foot;

	/**
	 * Helps to manipulate with q-grid client area.
	 */
	readonly view: View;

	/**
	 * Get raw data of what is rendered right now in qgrid.
	 */
	readonly data: Data;
}
