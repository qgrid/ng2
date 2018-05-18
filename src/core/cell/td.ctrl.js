import { GRID_PREFIX } from '../definition';
import * as css from '../services/css';
import {isFunction, isDate, isArray} from '../utility/kit';

const toJson = JSON.stringify;
const toString = Object.prototype.toString;
const hasCustomToString = obj => isFunction(obj.toString) && obj.toString !== toString;

export class TdCtrl {
	static classify(element, column) {
		element.classList.add(css.escapeAttr(`${GRID_PREFIX}-${column.key}`));
		element.classList.add(css.escapeAttr(`${GRID_PREFIX}-${column.type}`));
		if (column.editor) {
			element.classList.add(css.escapeAttr(`${GRID_PREFIX}-${column.editor}`));
		}
	}

	static viewMode(element) {
		element.classList.remove(`${GRID_PREFIX}-edit`);
	}

	static editMode(element) {
		element.classList.add(`${GRID_PREFIX}-edit`);
	}

	static stringify(value) {
		if (value == null) { // null || undefined
			return '';
		}

		switch (typeof value) {
			case 'string':
				break;
			case 'number':
				value = '' + value;
				break;
			default:
				if (hasCustomToString(value) && !isArray(value) && !isDate(value)) {
					value = value.toString();
				} else {
					value = toJson(value);
				}
		}

		return value;
	}
}