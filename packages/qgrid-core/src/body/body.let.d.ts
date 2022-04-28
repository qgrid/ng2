import { GridPlugin } from '../plugin/grid.plugin';
import { Renderer } from '../scene/render/render';
import { ColumnView } from '../scene/view/column.view';

/**
 * Use this class to get access to the main area rendering options.
 *
 * ### How to access
 *
 * ```html
 * <ng-template let-$view="$view">
 * 		Count of columns for the first row: {{$view.body.render.columns(rows[0], null, 0)]).length}}
 * </ng-template>
 * ```
 *
 */
export declare class BodyLet {
	/**
	 *  Use to build layout.
	 */
	readonly render: Renderer;

	constructor(plugin: GridPlugin);

	columns(pin: string): ColumnView[];
}
