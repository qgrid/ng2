import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('datetime-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('datetime-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class DateTimeColumnModel extends DataColumnModel {
	constructor() {
		super('datetime');

		this.format = 'MM/dd/yyyy h:mm a';
	}
}

export class DateTimeColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? DateTimeColumn.assign(model) : new DateTimeColumnModel();
	}
}