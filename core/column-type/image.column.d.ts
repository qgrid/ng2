import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {Model} from '../infrastructure/model';

export declare class ImageColumnModel extends DataColumnModel {
	constructor();
	canUpload: boolean;
	hasPreview: boolean;
}

export declare class ImageColumn extends ColumnView {
	constructor(model: Model);
	static model(model: Model): Model;
}