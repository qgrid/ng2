/**
 * Scroll mode.
 *
 * * `'default'` mode without virtualization.
 * * `'virtual'` turn on virtual mode.
 */
export declare type ScrollStateMode = 'default' | 'virtual';

/**
 * A class that contains properties about scroll status.
 */
export declare class ScrollState {

	/**
	 * Scroll mode.
	 */
	mode: ScrollStateMode;

	/**
	 * Top scroll position.
	 */
	top: number;

	/**
	 * Left scroll position.
	 */
	left: number;

	/**
	 * Row index on top of the q-grid client area.
	 */
	cursor: number;

	map: {
		rowToView: (index: number) => number,
		viewToRow: (index: number) => number,
	};

	resetTriggers: Array<string>;
}
