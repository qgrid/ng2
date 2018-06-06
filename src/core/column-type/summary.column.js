import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('summary-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

export class SummaryColumnModel extends DataColumnModel {
	constructor() {
		super('summary');

		this.key = '$summary';
		this.class = 'control';

		this.canEdit = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFilter = false;
		this.canSort = false;
		this.canMove = false;
	}
}

export class SummaryColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? SummaryColumn.assign(model) : new SummaryColumnModel();
	}
}