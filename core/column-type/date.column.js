import {ColumnView} from '../scene/view';
import {DataColumnModel} from './data.column.model';
import {TemplatePath} from '../template';

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

		this.format = 'yyyy/MM/dd';
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