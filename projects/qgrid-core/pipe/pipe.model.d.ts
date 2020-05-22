import { PipeUnit } from './pipe.unit';
import { Model } from '../infrastructure/model';

/**
 * A class that contains setting to control when and how q-grid should be updated.
 *
 * ### Default Triggers
 * ```javascript
 *  {
 *	   'data': {
 *	      'rows': PU.default,
 *		  'columns': PU.column
 *	   'pagination': {
 *		  'current': PU.default,
 *		  'size': PU.default
 *		},
 *		'fetch': {
 *		   'skip': PU.default
 *		},
 *		'sort': {
 *		   'by': PU.default
 *		},
 *		'filter': {
 *		   'by': PU.default,
 *		   'unit': PU.column
 *		},
 *		'group': {
 *		   'by': PU.default
 *		},
 *		'pivot': {
 *		   'by': PU.default
 *		},
 *		'columnList': {
 *		   'index': PU.column
 *		},
 *		'row': {
 *		   'status': PU.rowDetails,
 *         'canMove': PU.column,
 *         'canResize': PU.column
 *		},
 *		'selection': {
 *		   'mode': PU.column,
 *		   'unit': PU.column
 *		}
 *  };
 * ```
 */
export declare interface PipeModel {
	/**
	 * A function that allows to shrink a number of pipe units that should be invoked on referch request.
	 */
	reduce: (xs: PipeUnit[], Model) => PipeUnit[];

	/**
	 * A schema that shows what pipeline will be executed on appropriate model property change.
	 *
	 */
	triggers: { [modelName: string]: { [modelProperty: string]: PipeUnit } };

	effect: { [key: string]: any }
}
