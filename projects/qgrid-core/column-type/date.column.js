import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';
import { get as getValue } from '../services/value';
import { FormatService } from '../format/format.service';
import { parseFactory, getType } from '../services/convert';
import { Log } from '../infrastructure/log';

TemplatePath.register('date-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('date-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class DateColumnModel extends DataColumnModel {
	constructor() {
		super('date');

		this.format = 'MM/dd/yyyy';
		this.parse = parseFactory('date');

		this.label = function (row) {
			const value = getValue(row, this);
			try {
				const date = this.parse(value);
				return FormatService.date(date, this.format);
			} catch (ex) {
				Log.error('date.column', ex);
				return value;
			}
		};
	}
}

export class DateColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? DateColumn.assign(model) : new DateColumnModel();
	}
}