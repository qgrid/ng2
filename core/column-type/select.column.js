import {ColumnView} from '../scene/view';
import {ColumnModel} from './column.model';
import {TemplatePath} from '../template';
import {noop} from '../utility';

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
		this.class = 'control';

		this.editorOptions.trigger = 'focus';
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
