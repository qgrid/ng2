import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {TemplatePath} from '../template';
import {yes} from '../utility';
import {isImage} from '../services/file';

TemplatePath.register('image-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('image-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class ImageColumnModel extends DataColumnModel {
	constructor() {
		super('image');

		this.canUpload = yes;

		this.hasPreview =
			name => isImage(name);
	}
}

export class ImageColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? ImageColumn.assign(model) : new ImageColumnModel();
	}
}