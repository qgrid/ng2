import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { StyleRowContext, StyleCellContext } from './style.context';


export declare type StyleRowCallback = (row: any, context: StyleRowContext) => void;
export declare type StyleCellCallback = (row: any, column: ColumnModel, context: StyleCellContext) => void;

/**
 * A class that allows to apply styles to rows and cells.
 *
 * ### Usage
 *
 * ```javascript
 *    gridModel.style({
 *        row: (row, context) => {
 *            if (row.gender === 'female') {
 *                context.class(`female-row-${this.femaleColor}`, {background: '#' + this.femaleColor});
 *            }
 *
 *            if (row.gender === 'male') {
 *                context.class(`male-row-${this.maleColor}`, {background: '#' + this.maleColor});
 *            }
 *        },
 *        cell: (row, column, context) => {
 *            if (column.key === 'birthday') {
 *                context.class('red-birthday', {background: '#f00', color: '#fff'});
 *            }
 *
 *            if (column.key === 'name.last') {
 *                if (context.value(row, context.columns.map.gender) === 'female') {
 *                    context.class('female-name-last', {background: '#ff0', color: '#000'});
 *                }
 *            }
 *
 *            if (column.key === 'name.first') {
 *                if (context.row % 2) {
 *                    context.class('first-name-even', {background: '#000', color: '#fff'});
 *                }
 *                else {
 *                    context.class('first-name-odd', {background: '#fff', color: '#000'});
 *                }
 *            }
 *        }
 *    });
 * ```
 *
 * ### Suggested Links
 *
 * * [Style View](/doc/api/style-view.html)
 * * [style.monitor.js](https://github.com/qgrid/ng2/blob/master/core/style/style.monitor.js)

 */
export declare interface StyleModel {
	/**
	 * Style row.
	 */
	row: StyleRowCallback;

	/**
	 * Style cell, when object is used key represents column key.
	 */
	cell: StyleCellCallback | { [key: string]: StyleCellCallback };

	/**
	 * On invalidate.
	 */
	invalidate: Command;

	/**
	 * Queue of row styles that can be used internally or in plugins.
	 */
	rows: StyleRowCallback[];

	/**
	 * Queue of cell styles that can be used internally or in plugins.
	 */
	cells: StyleCellCallback[];

	/**
	 * List of CSS classes
	 */
	classList: Array<string>;
}
