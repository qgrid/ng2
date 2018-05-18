import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('id-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('id-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class IdColumnModel extends DataColumnModel {
	constructor() {
		super('id');
	}
}

export class IdColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? IdColumn.assign(model) : new IdColumnModel();
	}
}