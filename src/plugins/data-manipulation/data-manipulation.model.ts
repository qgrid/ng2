import {
	identity,
	cloneDeep,
	isArray,
	isObject,
	isDate,
	isBoolean,
	isNumber,
	isFunction
} from 'ng2-qgrid/core/utility';

export class DataManipulationModel {
	public deleted = new Set();
	public added = new Set();
	public edited = new Map();

	public rowFactory = etalonRow => {
		if (etalonRow) {
			return cloneDeep(etalonRow, value => {
				if (isArray(value)) {
					return [];
				}

				if (
					!isObject(value) ||
					isNumber(value) ||
					isDate(value) ||
					isBoolean(value) ||
					isFunction(value)
				) {
					return null;
				}
			});
		}
	}

	public rowId = identity;

	constructor() {}
}
