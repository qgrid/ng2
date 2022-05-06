import { NodeState } from './node.state';

export declare class Node {
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
  // eslint-disable-next-line no-use-before-define
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

  constructor(key: string | any, level: number, type?: string);
}
