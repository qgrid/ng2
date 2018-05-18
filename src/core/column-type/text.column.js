import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

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

export class TextColumnModel extends DataColumnModel {
	constructor() {
		super('text');

		this.maxLength = 140;
	}
}

export class TextColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? TextColumn.assign(model) : new TextColumnModel();
	}
}