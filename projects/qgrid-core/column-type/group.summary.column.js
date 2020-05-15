import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('group-summary-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

export class GroupSummaryColumnModel extends DataColumnModel {
	constructor() {
		super('group-summary');

		this.key = '$group.summary';
		this.category = 'control';

		this.canEdit = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFilter = false;
		this.canSort = false;
		this.canMove = false;
	}
}

export class GroupSummaryColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? GroupSummaryColumn.assign(model) : new GroupSummaryColumnModel();
	}
}