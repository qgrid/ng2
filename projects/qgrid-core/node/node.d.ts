import { NodeState } from './node.state';

export declare class Node {
	constructor(key: string | any, level: number, type?: string);

	/**
	 * Unique identifier for the node.
	 */
	key: string | any;

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
	 * List of row indices that belongs to the node.
	 */
	rows: number[];

	/**
	 * List of child nodes.
	 */
	children: Node[];

	/**
	 * Column key of the node.
	 */
	source: string;

	/**
	 * Value of the node.
	 */
	value: any;

	/**
	 * Shows if node was expanded or not.
	 */
	state: NodeState;
}
