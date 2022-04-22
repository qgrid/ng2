import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('time-cell', (template, column) => ({
	model: template.for,
	resource: column.key
}));

TemplatePath.register('time-cell-edit', (template, column) => ({
	model: 'edit',
	resource: column.key
}));

export class TimeColumnModel extends DataColumnModel {
	constructor() {
		super('time');

		this.format = 'h:mm a';
	}
}

export class TimeColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? TimeColumn.assign(model) : new TimeColumnModel();
	}
}
