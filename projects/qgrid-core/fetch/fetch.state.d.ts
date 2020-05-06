/**
 * A class that can be used in custom user pipe within `PaginationState` to make server request when
 * virtual scrolling is enabled.
 */
export declare class FetchState {
	/**
	 * Number of rows that should be skipped to get new portion of data,
	 * this property is filled by internal virtual scroll service.
	 */
	skip: number;
}
