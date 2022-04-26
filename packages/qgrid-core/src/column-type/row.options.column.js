import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { DataColumnModel } from './data.column.model';

TemplatePath.register('row-options-cell', (template, column) => ({
	model: template.for,
	resource: column.key,
}));

TemplatePath.register('row-options-cell-edit', (template, column) => ({
	model: 'edit',
	resource: column.key,
}));

export class RowOptionsColumnModel extends DataColumnModel {
	constructor() {
		super('row-options');

		this.key = '$row.options';
		this.category = 'control';

		this.canEdit = true;
		this.canResize = false;
		this.canMove = false;
		this.canHighlight = false;
		this.canFilter = false;
		this.pin = 'right';
	}
}

export class RowOptionsColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowOptionsColumn.assign(model) : new RowOptionsColumnModel();
	}
}
