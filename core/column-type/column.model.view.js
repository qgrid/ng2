import {ColumnModel} from './column.model';
import {View} from '../view';
import {TemplatePath} from '../template';
import {isObject, isFunction} from '../utility';

TemplatePath.register('custom-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('custom-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class ColumnView extends View {
	constructor(model) {
		super(model);

		this.colspan = 1;
		this.rowspan = 1;
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
			}
			else if (isObject(body[key]) && !isFunction(body[key])) {
				body[key] = Object.assign({}, etalon[key], body[key]);
			}
		}
		return body;
	}
}