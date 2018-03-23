import { Resource } from '../resource/resource';

/**
 * > Under construction.
 *
 * ### Suggested Links
 *
 * * [Row View](/doc/api/row-view.html)
 */
export declare class RowModel {
	constructor();

	resource: Resource;
	mode: 'single' | 'multiple';
	unit: 'data' | 'details';
	height: (element: HTMLElement, index: number) => number | number;
	status: Map<any, any>;
	canDrag: boolean;
	canResize: boolean;
	frozen: any[];
}
