import { Resource } from '../resource/resource';

/**
 * A class that allows to split data to pages, also virtual scroll use some options from here.
 */
export declare class PaginationModel {
	constructor();
	resource: Resource;

	/**
	 * Current page number;
	 */
	current: number;

	/**
	 * Selected page size.
	 */
	size: number;

	/**
	 * List of available sizes.
	 */
	sizeList: number[];

	/**
	 * Count of total rows.
	 */
	count: number;
}

