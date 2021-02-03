import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { FormatService } from '../format/format.service';
import { get as getValue } from '../services/value';
import { getType, parseFactory } from '../services/convert';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('datetime-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('datetime-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class DateTimeColumnModel extends DataColumnModel {
	constructor() {
		super('datetime');

		this.format = 'MM/dd/yyyy h:mm a';
		this.dateFormat = 'MM/dd/yyyy';
		this.timeFormat = 'h:mm a';
		this.parse = parseFactory('datetime');

		this.label = function (row) {
			const value = getValue(row, this);
			try {
				const date = this.parse(value);
				return FormatService.date(date, this.format);
			} catch (ex) {
				return value;
			}
		};
	}
}

export class DateTimeColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? DateTimeColumn.assign(model) : new DateTimeColumnModel();
	}
}