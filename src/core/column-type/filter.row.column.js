import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('filter-row-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

export class FilterRowColumnModel extends ColumnModel {
	constructor(model) {
		super();

		Object.assign(this, model);

		this.key = `$filter.row.${model.key}`;
		this.type = 'filter-row';
		this.class = 'control';

		this.canFilter = model.canFilter && model.class === 'data';
		this.model = model;
	}
}

export class FilterRowColumn extends ColumnView {
	constructor(model) {
		super(new FilterRowColumnModel(model));
	}
}