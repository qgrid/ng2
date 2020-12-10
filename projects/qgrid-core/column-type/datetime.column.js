import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';
import { get as getValue } from '../services/value';
import { FormatService } from '../format/format.service';

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

		this.label = function (row) {
			const value = getValue(row, this);
			const parse = parseFactory('datetime');
			const date = parse(value);
			const isValidDate = getType(date) === 'datetime' && !isNaN(date);
			return isValidDate ? FormatService.date(date, this.format) : value; 
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