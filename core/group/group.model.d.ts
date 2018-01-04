import { Resource } from '../resource/resource';
import { Command } from '../command/command';

/**
 * A class that allows to apply some hierarchy to the grid.
 * However user is allowed to write any kind of custom hierarchies just by overriding default pipe and 
 * working with `Node` object from the grid service.
 */
export declare class GroupModel {
	resource: Resource;

	/**
	 * How grid will render nodes:
	 * 1. `column` - all hierarchy levels inside one group type column. 
	 * 2. `subhead` - group column try to use all available space to display hierarchy.
	 * 3. `rowspan` - 
	 */
	mode: string;
	/**
	 * List of column keys to build appropriate hierarchy.
	 * Each item represents next level.
	 */
	by: string[];
	shortcut: object;
	toggle: Command;
}
