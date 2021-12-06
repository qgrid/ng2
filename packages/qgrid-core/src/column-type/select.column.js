import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';
import { TemplatePath } from '../template/template.path';
import { noop } from '../utility/kit';

TemplatePath.register('select-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('select-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class SelectColumnModel extends ColumnModel {
	constructor() {
		super('select');

		this.key = '$select';
		this.title = '';
		this.category = 'control';

		this.canEdit = false;
		this.editorOptions.cruise = 'transparent';
		this.value = noop;

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
