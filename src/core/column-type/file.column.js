import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { TemplatePath } from '../template/template.path';
import { yes } from '../utility/kit';
import { isImage } from '../services/file';

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

export class FileColumnModel extends DataColumnModel {
	constructor() {
		super('file');

		this.canUpload = yes;
		this.editorOptions.trigger = 'custom';

		this.hasPreview = name => isImage(name);
		this.canSort = false;
		this.canFilter = false;
	}
}

export class FileColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? FileColumn.assign(model) : new FileColumnModel();
	}
}