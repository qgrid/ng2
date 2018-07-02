import { Resource } from '../resource/resource';

/**
 * A class representing the q-grid job state.
 *
 * ### Usage
 *
 * In general this model is not modified directly, consider to [grid service](`/doc/api/grid-service.html`).
 *
 * ```javascript
 * 	const gridModel = qgrid.model();
 *	const service = qgrid.service(gridModel);
 *	const cancelBusy = service.busy();
 *
 *	new Promise(resolve => {
 *	   cancelBusy();
 *     resolve()
 *	});
 * ```
 */
export declare interface ProgressModel {
	resource?: Resource;

	/**
	 * Indicates if there a running job or not.
	 */
	isBusy?: boolean;

	/**
	 * List of progress jobs.
	 */
	queue?: string[];
}
