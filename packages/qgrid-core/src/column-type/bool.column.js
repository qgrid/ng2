import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';

TemplatePath.register('bool-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('bool-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class BoolColumnModel extends DataColumnModel {
	constructor() {
		super('bool');

		this.trueValue = true;
		this.falseValue = false;

		this.editorOptions.cruise = 'transparent';

		// as we use 'this' pointer inside, we can't use lambda in 2 here
		this.isIndeterminate = function (value) {
			return !(value === this.trueValue || value === this.falseValue);
		};

		this.isChecked = function (value) {
			return value === this.trueValue;
		};
	}
}

export class BoolColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? BoolColumn.assign(model) : new BoolColumnModel();
	}
}