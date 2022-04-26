import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('email-cell', (template, column) => ({
	model: template.for,
	resource: column.key,
}));

TemplatePath.register('email-cell-edit', (template, column) => ({
	model: 'edit',
	resource: column.key,
}));

export class EmailColumnModel extends DataColumnModel {
	constructor() {
		super('email');

		this.editorOptions.trigger = 'custom';
	}
}

export class EmailColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? EmailColumn.assign(model) : new EmailColumnModel();
	}
}
