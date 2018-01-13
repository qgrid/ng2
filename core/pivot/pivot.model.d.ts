import {Resource} from '../resource/resource';

/**
 * A class to control q-grid pivoting functions.
 */
export declare class PivotModel {
	constructor();
	resource: Resource;

	/**
	 * A list of column keys to pivot. Each item represents next level.
	 */
	by: any[];
}