import { ColumnView } from '../scene/view/column.view';
import { TemplatePath } from '../template/template.path';
import { ColumnModel } from './column.model';

TemplatePath.register('cohort-cell', (template) => {
	return {
		model: template.for,
		resource: `${template.for}.${template.type}`
	};
});

export class CohortColumnModel extends ColumnModel {
	constructor() {
		super('cohort');

		this.key = '$cohort';

		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canFocus = false;
		this.canFilter = false;
		this.category = 'cohort';
	}
}

export class CohortColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? CohortColumn.assign(model) : new CohortColumnModel();
	}
}
