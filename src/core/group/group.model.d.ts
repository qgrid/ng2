import { Resource } from '../resource/resource';
import { Command } from '../command/command';

/**
 * A class that allows to apply some hierarchy to the grid.
 * However user is allowed to write any kind of custom hierarchies just by overriding default pipe and
 * working with `Node` object from the grid service.
 *
 * ### Suggested Links
 *
 * * [Group View](/doc/api/group-view.html)
 * * [group.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/group.pipe.js)
 * * [group.build.js](https://github.com/qgrid/ng2/blob/master/core/group/group.build.js)
 * * [node.js]((https://github.com/qgrid/ng2/blob/master/core/node/node.js)
 * * [node.build.js](https://github.com/qgrid/ng2/blob/master/core/node.build.js)
 */
export declare interface GroupModel {
	resource?: Resource;

	/**
	 * How grid will render nodes:
	 * * `'column'` all hierarchy levels inside one group type column.
	 * * `'subhead'` group column try to use all available space to display hierarchy.
	 * * `'rowspan'` under construction
	 */
	mode?: 'column' | 'subhead' | 'rowspan';
	/**
	 * List of column keys to build appropriate hierarchy.
	 * Each item represents next level.
	 */
	by?: string[];
	toggle?: Command;
	toggleAll?: Command;
	shortcut?: { [key: string]: string };
}
