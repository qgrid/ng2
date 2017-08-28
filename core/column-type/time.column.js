import {ColumnView} from '../scene/view';
import {DataColumnModel} from './data.column.model';
import {TemplatePath} from '../template';

TemplatePath.register('time-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('time-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class TimeColumnModel extends DataColumnModel {
	constructor() {
		super('time');

		this.format = 'h:mm a';
	}
}

export class TimeColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? TimeColumn.assign(model) : new TimeColumnModel();
	}
}