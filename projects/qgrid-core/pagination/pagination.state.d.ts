export declare type PaginationStateMode = 'showPages' | 'showRows';

/**
 * A class that allows to split data to pages, also virtual scroll use some options from here.
 */
export declare class PaginationState {
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

	mode: PaginationStateMode;

	/**
	 * List of `model name: [model properties]` pairs to reset pagination current property to 0.
	 */
	resetTriggers: { [key: string]: string[] };
}
