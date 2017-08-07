import {ColumnView} from './column.model.view';
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

		this.key = '$row.number';
		this.title = '#';
		this.canEdit = false;
		this.canResize = false;
		this.canMove = false;
		this.canHighlight = false;
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