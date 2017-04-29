import ColumnView from 'core/column-type/column.model.view';
import DataColumnModel from './data.column.model';
import TemplatePath from 'core/template/template.path';

TemplatePath.register('number-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('number-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class NumberColumnModel extends DataColumnModel{
	constructor(){
		super('number');

		this.format = '';
	}
}

export default class NumberColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? NumberColumn.assign(model) : new NumberColumnModel();
	}
}