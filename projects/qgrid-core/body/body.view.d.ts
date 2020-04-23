import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { ColumnView } from '../scene/view/column.view';
import { Renderer } from '../scene/render/render';

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
 * * ### Suggested Links
 *
 * * [Render](/doc/api/render.html)
 * * [View](/doc/api/view.html)
 */
export declare class BodyView {
	constructor(model: Model, table: Table);
	
	readonly rows: any[];

	/**
	 *  Use to build layout.
	 */
	render: Renderer;

	columns(pin: string): ColumnView[];
}
