import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('password-cell', (template, column) => ({
	model: template.for,
	resource: column.key,
}));

TemplatePath.register('password-cell-edit', (template, column) => ({
	model: 'edit',
	resource: column.key,
}));

export class PasswordColumnModel extends DataColumnModel {
	constructor() {
		super('password');

		this.canSort = false;
		this.canFilter = false;
	}
}

export class PasswordColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? PasswordColumn.assign(model) : new PasswordColumnModel();
	}
}
