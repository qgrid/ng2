import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';
import { get as getValue } from '../services/value';
import { isArray, identity } from '../utility/kit';

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

		this.itemLabel = identity;
		this.label = function (row) {
			const value = getValue(row, this);
			const itemLabel = this.itemLabel.bind(this);
			return isArray(value) ? value.map(itemLabel).join(', ') : value;
		};
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