import {ColumnView} from '../scene/view';
import {ColumnModel} from './column.model';
import {TemplatePath} from '../template';

TemplatePath.register('row-details-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class RowDetailsColumnModel extends ColumnModel {
	constructor() {
		super('row-details');

		this.key = '$row.details';
		this.title = 'Row Details';
		this.class = 'control';

		this.canEdit = false;
		this.canResize = false;
		this.canHighlight = false;
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