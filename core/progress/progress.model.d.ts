import {Resource} from '../resource/resource';

/**
 * A class representing the q-grid job state.
 */
export declare class ProgressModel {
	constructor();
	resource: Resource;

	/**
	 * Indicates if there a running job or not.
	 */
	isBusy: boolean;

	/**
	 * List of progress jobs.
	 */
	queue: string[];
}
