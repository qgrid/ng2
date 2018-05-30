import { Resource } from '../resource/resource';

/**
 * > Under construction.
 *
 * ### Suggested Links
 *
 * * [Row View](/doc/api/row-view.html)
 */
export declare interface RowModel {
	resource?: Resource;
	mode?: 'single' | 'multiple';
	unit?: 'data' | 'details';
	height?: (element: HTMLElement, index: number) => number | number;
	status?: Map<any, any>;
	canMove?: boolean;
	canResize?: boolean;
}
