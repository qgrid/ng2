import {ColumnView} from './column.model.view';
import {DataColumnModel} from './data.column.model';
import {IEditorOptions} from './column.model';
import {Model} from "../infrastructure/model";

export interface IHasPreview {
	(name: string): boolean;
}

export declare class FileColumnModel extends DataColumnModel {
	constructor();

	canUpload: boolean;
	hasPreview: IHasPreview;
}

export declare class FileColumn extends ColumnView {
	constructor(model: Model);

	static model(model: Model): Model;
}