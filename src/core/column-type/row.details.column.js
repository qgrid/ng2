import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('row-details-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

export class RowDetailsColumnModel extends ColumnModel {
	constructor() {
		super('row-details');

		this.key = '$row.details';
		this.class = 'control';

		this.canEdit = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFilter = false;
		this.canSort = false;
	}
}

export class RowDetailsColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowDetailsColumn.assign(model) : new RowDetailsColumnModel();
	}
}