import { NodeState } from './state';

export declare class Node {
	constructor(key: string, level: number, type?: string);

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
	 * * `'summary'`
	 */
	type: 'group' | 'row' | 'value' | 'summary';

	/**
	 * List of row indicies that belongs to the node.
	 */
	rows: number[];

	/**
	 * List of child nodes.
	 */
	children: Node[];

	/**
	 * Shows if node was expanded or not.
	 */
	state: NodeState;

	/**
	 * Column key of node.
	 */
	source: string;
}
