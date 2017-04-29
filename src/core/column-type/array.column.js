import ColumnView from 'core/column-type/column.model.view';
import DataColumnModel from './data.column.model';
import TemplatePath from 'core/template/template.path';

TemplatePath.register('array-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('array-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class ArrayColumnModel extends DataColumnModel {
	constructor() {
		super('array');
	}
}

export default class ArrayColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? ArrayColumn.assign(model) : new ArrayColumnModel();
	}
}