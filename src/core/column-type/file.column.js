import ColumnView from 'core/column-type/column.model.view';
import DataColumnModel from './data.column.model';
import TemplatePath from 'core/template/template.path';
import {yes} from 'core/services/utility';
import {isImage} from 'core/services/file';

TemplatePath.register('file-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('file-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

class FileColumnModel extends DataColumnModel {
	constructor() {
		super('file');

		this.canUpload = yes;
		this.editorOptions.trigger = 'custom';

		this.hasPreview =
			name => isImage(name);
	}
}

export default class FileColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? FileColumn.assign(model) : new FileColumnModel();
	}
}