import { IState } from './state';

export declare class Node {
	constructor(key: string, level: number, type: string);

	/**
	 * Unique identifier for the node.
	 */
	key: string;

	/**
	 * Node hierarchy level.
	 */
	level: number;

	/**
	 * Type of the node.
	 *
	 * * `'group'`
	 * * `'row'`
	 * * `'value'`
	 *
	 */
	type: string;

	/**
	 * List of row indicies that belongs to the node.
	 */
	rows: any[];

	/**
	 * List of child nodes.
	 */
	children: any[];

	/**
	 * Shows if node was expanded or not.
	 */
	state: IState;
}
