import { ColumnModel } from '../../column-type/column.model';
import { isObject, isFunction, isArray } from '../../utility/kit';

export class ColumnView {
	constructor(model) {
		this.model = model;

		this.colspan = 1;
		this.rowspan = 1;
		this.index = -1;
	}

	static model(model) {
		if (model) {
			ColumnView.assign(model);
		}
		else {
			model = new ColumnModel();
		}

		model.origin = 'custom';
		return model;
	}

	static assign(body) {
		const etalon = this.model();
		for (let key of Object.keys(etalon)) {
			if (!body.hasOwnProperty(key)) {
				let etalonValue = etalon[key];
				if (isFunction(etalonValue)) {
					etalonValue = etalonValue.bind(body);
				}
				body[key] = etalonValue;
			} else {
				const value = body[key];
				if (isArray(value)) {
					body[key] = Array.from(value);
				} else if (isObject(value) && !isFunction(value)) {
					body[key] = Object.assign({}, etalon[key], value);
				}
			}
		}
		return body;
	}
}