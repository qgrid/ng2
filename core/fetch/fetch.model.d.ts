/**
 * A class that can be used in custom user pipe within `PaginationModel` to make server request when
 * virtual scrolling is enabeld.
 */
export declare class FetchModel {
	/**
	 * Number of rows that should be skipped to get new portion of data,
	 * this property is filled by internal virtual scroll service.
	 */
	skip: number;
}