import {ColumnModel} from './column.model';
import {View} from '../view';
import {TemplatePath} from '../template';
import {isObject, isFunction} from '../services/utility';

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

		this.colspan = 0;
		this.rowspan = 0;
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
				body[key] = etalon[key];
			} else if (isObject(body[key]) && !isFunction(body[key])) {
				body[key] = Object.assign({}, etalon[key], body[key]);
			}
		}
		return body;
	}
}