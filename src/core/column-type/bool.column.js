import ColumnView from 'core/column-type/column.model.view';
import DataColumnModel from './data.column.model';
import TemplatePath from 'core/template/template.path';

TemplatePath.register('bool-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('bool-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class BoolColumnModel extends DataColumnModel {
	constructor() {
		super('bool');
	}
}

export default class BoolColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? BoolColumn.assign(model) : new BoolColumnModel();
	}
}