import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {TemplatePath} from '../template';

TemplatePath.register('row-options-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('row-options-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class RowOptionsColumnModel extends DataColumnModel {
	constructor() {
		super('row-options');

		this.key = '$row.options';
		this.title = '';
		this.canEdit = true;
		this.canResize = false;
		this.canMove = false;
		this.canHighlight = false;
		this.width = 60;
		this.class = 'control';
		this.pin = 'right';
	}
}

export class RowOptionsColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? RowOptionsColumn.assign(model) : new RowOptionsColumnModel();
	}
}