import ColumnView from 'core/column-type/column.model.view';
import DataColumnModel from './data.column.model';
import TemplatePath from 'core/template/template.path';

TemplatePath.register('text-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('text-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

TemplatePath.register('text-area-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class TextColumnModel extends DataColumnModel {
	constructor() {
		super('text');

		this.maxLength = 140;
	}
}

export default class TextColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? TextColumn.assign(model) : new TextColumnModel();
	}
}