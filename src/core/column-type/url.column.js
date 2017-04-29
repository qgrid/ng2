import ColumnView from 'core/column-type/column.model.view';
import DataColumnModel from './data.column.model';
import TemplatePath from 'core/template/template.path';

TemplatePath.register('url-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('url-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class UrlColumnModel extends DataColumnModel {
	constructor() {
		super('url');

		this.editorOptions.trigger = 'button';
	}
}

export default class UrlColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? UrlColumn.assign(model) : new UrlColumnModel();
	}
}