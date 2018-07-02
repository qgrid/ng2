import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';
import { TemplatePath } from '../template/template.path';

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
		this.labelPath = 'key';
		this.title = 'Group';
		this.offset = 24;
		this.canEdit = false;
		this.canSort = false;
		this.canFilter = false;
		this.class = 'control';
		this.by = null;
		this.label = function (node) {
			if (node.type === 'row') {
				return '';
			}

			const { by, labelPath } = this;
			return !by || by === node.source ? node[labelPath] : '';
		};
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
