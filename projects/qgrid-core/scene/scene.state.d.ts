import { ColumnView } from './view/column.view';
import { RowView } from './view/row.view';

export declare type SceneStateStatus = 'idle' | 'start' | 'pull' | 'push' | 'stop';
export declare type SceneStateColumnArea =  { left: ColumnView[], right: ColumnView[], mid: ColumnView[] };
export declare type SceneStateColumnLine = ColumnView[];
export declare type SceneStateColumnRows = ColumnView[][];

/**
 * A class that contains results of q-grid invalidate.
 */
export declare class SceneState {

	/**
	 * Status of invalidation.
	 *
	 * * `start` request to refresh the q-grid.
	 * * `pull` request to propagate a q-grid model to the UI.
	 * * `push` request UI to draw a model.
	 * * `stop` scene in the stable state.
	 */
	status: SceneStateStatus;

	/**
	 * List of rows to render.
	 */
	rows: RowView[];

	/**
	 * Column rendering object.
	 */
	column: {
		rows: SceneStateColumnRows,
		line: SceneStateColumnLine,
		area: SceneStateColumnArea
	};
}
