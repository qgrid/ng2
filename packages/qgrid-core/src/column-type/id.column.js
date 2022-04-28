import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('id-cell', (template, column) => ({
	model: template.for,
	resource: column.key,
}));

TemplatePath.register('id-cell-edit', (template, column) => ({
	model: 'edit',
	resource: column.key,
}));

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
