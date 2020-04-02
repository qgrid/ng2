import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('number-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('number-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class NumberColumnModel extends DataColumnModel {
	constructor() {
		super('number');

		this.format = '';
	}
}

export class NumberColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? NumberColumn.assign(model) : new NumberColumnModel();
	}
}