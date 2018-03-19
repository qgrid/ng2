import {ColumnView} from '../scene/view';
import {ColumnModel} from './column.model';
import {TemplatePath} from '../template';

TemplatePath.register('row-number-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

export class RowNumberColumnModel extends ColumnModel {
	constructor() {
		super('row-number');

		this.pin = 'left';
		this.key = '$row.number';
		this.title = 'No.';
		this.canEdit = false;
		this.canResize = false;
		this.canFocus = false;
		this.canMove = false;
		this.canHighlight = false;
		this.canSort = false;
		this.canFilter = false;
		this.class = 'control';
	}
}

export class RowNumberColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowNumberColumn.assign(model) : new RowNumberColumnModel();
	}
}