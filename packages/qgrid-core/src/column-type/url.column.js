import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('url-cell', (template, column) => ({
	model: template.for,
	resource: column.key
}));

TemplatePath.register('url-cell-edit', (template, column) => ({
	model: 'edit',
	resource: column.key
}));

export class UrlColumnModel extends DataColumnModel {
	constructor() {
		super('url');

		this.editorOptions.trigger = 'custom';
	}
}

export class UrlColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? UrlColumn.assign(model) : new UrlColumnModel();
	}
}
