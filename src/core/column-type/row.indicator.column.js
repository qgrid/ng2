import ColumnView from 'core/column-type/column.model.view';
import TemplatePath from 'core/template/template.path';
import ColumnModel from './column.model';

TemplatePath.register('row-indicator-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

class RowIndicatorColumnModel extends ColumnModel {
	constructor() {
		super('row-indicator');

		this.key = '$row.indicator';
		this.title = 'Row Indicator';
		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canMove = false;
		this.canFocus = false;
		this.canHighlight = false;
	}
}

export default class RowIndicatorColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowIndicatorColumn.assign(model) : new RowIndicatorColumnModel();
	}
}