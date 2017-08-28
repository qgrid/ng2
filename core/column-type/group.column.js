import {ColumnView} from '../scene/view';
import {ColumnModel} from './column.model';
import {TemplatePath} from '../template';

TemplatePath.register('group-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.type
	};
});

TemplatePath.register('group-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class GroupColumnModel extends ColumnModel {
	constructor() {
		super('group');

		this.key = '$group';
		this.path = 'key';

		this.title = 'Group';
		this.offset = 24;
		this.canEdit = false;
		this.canSort = false;
		this.class = 'control';
	}
}

export class GroupColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? GroupColumn.assign(model) : new GroupColumnModel();
	}
}