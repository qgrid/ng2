import {ColumnView} from '../scene/view';
import {DataColumnModel} from './data.column.model';
import {TemplatePath} from '../template';
import {identity} from '../utility';

TemplatePath.register('array-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('array-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class ArrayColumnModel extends DataColumnModel {
	constructor() {
		super('array');

		this.label = identity;
	}
}

export class ArrayColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? ArrayColumn.assign(model) : new ArrayColumnModel();
	}
}