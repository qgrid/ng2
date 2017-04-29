import ColumnView from 'core/column-type/column.model.view';
import DataColumnModel from './data.column.model';
import TemplatePath from 'core/template/template.path';

TemplatePath.register('time-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('time-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class TimeColumnModel extends DataColumnModel {
	constructor() {
		super('time');

		this.format = 'h:mm a';
	}
}

export default class TimeColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? TimeColumn.assign(model) : new TimeColumnModel();
	}
}