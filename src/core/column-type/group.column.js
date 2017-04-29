import ColumnView from 'core/column-type/column.model.view';
import TemplatePath from 'core/template/template.path';
import ColumnModel from './column.model';

TemplatePath.register('group-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.type
	};
});

class GroupColumnModel extends ColumnModel {
	constructor() {
		super('group');

		this.key = '$group';
		this.title = 'Group';
		this.offset = 20;
		this.canEdit = false;
		this.canSort = false;
	}
}

export default class GroupColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? GroupColumn.assign(model) : new GroupColumnModel();
	}
}