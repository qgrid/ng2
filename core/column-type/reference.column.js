import {ColumnView} from '../scene/view';
import {DataColumnModel} from './data.column.model';
import {TemplatePath} from '../template';
import {Model} from '../infrastructure';

TemplatePath.register('reference-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('reference-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class ReferenceColumnModel extends DataColumnModel {
	constructor() {
		super('reference');

		this.editorOptions.trigger = 'custom';
		this.editorOptions.modelFactory = () => new Model();
	}
}

export class ReferenceColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? ReferenceColumn.assign(model) : new ReferenceColumnModel();
	}
}