/**
 * A class to control visibility of the q-grid areas.
 */
export declare class VisibilityState {
	/**
	 * Indicates if the q-grid `head` is visible.
	 */
	head: boolean;

	/**
	 * Indicates if the q-grid `foot` is visible.
	 */
	foot: boolean;

	/**
	 * Indicates if the q-grid `body` is visible.
	 */
	body: boolean;

	/**
	 * Object that controls if the q-grid `toolbar` panels are visible.
	 *
	 * * `'top'` show/hide top toolbar.
	 * * `'right'` show/hide right toolbar.
	 * * `'bottom'` show/hide bottom toolbar.
	 * * `'left'` show/hide left toolbar.
	 */
	toolbar: {
		top: boolean;
		right: boolean;
		bottom: boolean;
		left: boolean;
	};

	/**
	 * Object that controls if the q-grid `frozen` panels are visible.
	 *
	 * * `'right'` show/hide right pin panel.
	 * * `'left'` show/hide left pin panel.
	 * * `'top'` show/hide top floating rows.
	 * * `'bottom'` show/hide bottom floating rows.
	 */
	pin: {
		left: boolean;
		right: boolean;
		top: boolean;
		bottom: boolean;
	};

	plugin: { [key: string]: boolean };
}
