import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('password-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('password-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

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