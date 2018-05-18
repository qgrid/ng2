import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('date-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('date-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class DateColumnModel extends DataColumnModel {
	constructor() {
		super('date');

		this.format = 'MM/dd/yyyy';
	}
}

export class DateColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? DateColumn.assign(model) : new DateColumnModel();
	}
}