import { Resource } from '../../core/resource/resource';
import { cloneDeep, isArray, isObject, isDate, isBoolean, isNumber, isFunction } from '../../core/utility/kit';

export class DataManipulationModel {
	constructor() {
		this.resource = new Resource();

		this.deleted = new Set();
		this.added = new Set();
		this.edited = new Map();

		this.rowFactory = etalonRow => {
			if (etalonRow) {
				return cloneDeep(etalonRow, value => {
					if (isArray(value)) {
						return [];
					}

					if (!isObject(value) ||
						isNumber(value) ||
						isDate(value) ||
						isBoolean(value) ||
						isFunction(value)) {
						return null;
					}
				});
			}
		};
	}
}