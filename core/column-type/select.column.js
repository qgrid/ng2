import {ColumnView} from '../scene/view';
import {ColumnModel} from './column.model';
import {TemplatePath} from '../template';

TemplatePath.register('select-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

export class SelectColumnModel extends ColumnModel {
	constructor() {
		super('select');

		this.key = '$select';
		this.title = 'Select';
		this.class = 'control';

		this.canEdit = false;
		this.canResize = false;
	}
}

export class SelectColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? SelectColumn.assign(model) : new SelectColumnModel();
	}
}