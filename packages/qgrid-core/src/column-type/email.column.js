import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('email-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('email-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

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