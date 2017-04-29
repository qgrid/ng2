import ColumnView from 'core/column-type/column.model.view';
import TemplatePath from 'core/template/template.path';
import ColumnModel from './column.model';

TemplatePath.register('row-number-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class RowNumberColumnModel extends ColumnModel {
	constructor() {
		super('row-number');

		this.key = '$row.number';
		this.title = '#';
		this.canEdit = false;
		this.canResize = false;
		this.canMove = false;
		this.canHighlight = false;
	}
}

export default class RowNumberColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowNumberColumn.assign(model) : new RowNumberColumnModel();
	}
}