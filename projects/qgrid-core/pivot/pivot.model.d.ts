import { Resource } from '../resource/resource';

/**
 * A class to control q-grid pivoting functions.
 *
 * ### Suggested Links
 *
 * * [Pivot View](/doc/api/pivot-view.html)
 * * [pivot.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/pivot.pipe.js)
 * * [pivot.build.js](https://github.com/qgrid/ng2/blob/master/core/pivot/pivot.build.js)
 * * [pivot.form.js](https://github.com/qgrid/ng2/blob/master/core/pivot/pivot.form.js)
 */
export declare interface PivotModel {
	/**
	 * A list of column keys to pivot. Each item represents next level.
	 */
	by?: string[];
}
