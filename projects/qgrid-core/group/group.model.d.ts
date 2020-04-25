import { Command } from '../command/command';
import { Node } from '../node/node';

/**
 * A class that allows to apply some hierarchy to the grid.
 * However user is allowed to write any kind of custom hierarchies just by overriding default pipe and
 * working with `Node` object from the grid service.
 *
 * ### Suggested Links
 *
 * * [Group View](/doc/api/group-view.html)
 * * [group.pipe.js](https://github.com/qgrid/ng2/blob/master/projects/core/pipe/group.pipe.js)
 * * [group.build.js](https://github.com/qgrid/ng2/blob/master/projects/core/group/group.build.js)
 * * [node.js]((https://github.com/qgrid/ng2/blob/master/projects/core/node/node.js)
 * * [node.build.js](https://github.com/qgrid/ng2/blob/master/projects/core/node.build.js)
 */
export declare interface GroupModel {
	/**
	 * How grid will render nodes:
	 * * `'nest'` all hierarchy levels inside one group type column.
	 * * `'flat'` all hierarch levels inside own group type columns.
	 * * `'subhead'` group column try to use all available space to display hierarchy.
	 * * `'rowspan'` group column occupies all space on expand
	 */
	mode: 'nest' | 'column' | 'subhead' | 'rowspan';
	
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
