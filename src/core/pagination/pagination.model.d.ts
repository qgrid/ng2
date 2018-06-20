import { Resource } from '../resource/resource';

/**
 * A class that allows to split data to pages, also virtual scroll use some options from here.
 *
 * ### Suggested Links
 *
 * * [Pagination View](/doc/api/pagination-view.html)
 * * [pagination.pipe.js](https://github.com/qgrid/ng2/blob/master/core/pipe/pagination.pipe.js)
 */
export declare interface PaginationModel {
	resource?: Resource;

	/**
	 * Current page number;
	 */
	current?: number;

	/**
	 * Selected page size.
	 */
	size?: number;

	/**
	 * List of available sizes.
	 */
	sizeList?: number[];

	/**
	 * Count of total rows.
	 */
	count?: number;

	/**
	 * List of `model name: [model properties]` pairs to reset pagination current property to 0.
	 */
	resetTriggers?: { [key: string]: string[] };
}
