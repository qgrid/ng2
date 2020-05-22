import { Command } from '../command/command';
import { Node } from '../node/node';

/**
 * How grid will render nodes:
 * * `'nest'` all hierarchy levels inside one group type column.
 * * `'flat'` all hierarch levels inside own group type columns.
 * * `'subhead'` group column try to use all available space to display hierarchy.
 * * `'rowspan'` group column occupies all space on expand
 */
export declare type GroupStateMode = 'nest' | 'column' | 'subhead' | 'rowspan';

export declare type GroupStateSummary = null | 'leaf';

/**
 * A class that allows to apply some hierarchy to the grid.
 * However user is allowed to write any kind of custom hierarchies just by overriding default pipe and
 * working with `Node` object from the grid service.
 */
export declare class GroupState {
	/**
	 * How grid will render nodes:
	 */
	mode: GroupStateMode;

	summary: GroupStateSummary;

	/**
	 * List of column keys to build appropriate hierarchy.
	 * Each item represents next level.
	 */
	by: string[];

	toggle: Command;

	toggleAll: Command;

	shortcut: { [key: string]: string };

	flatten: (nodes: Node[]) => Node[];
}
