import { ColumnView } from '../scene/view/column.view';
import { DataColumnModel } from './data.column.model';
import { ColumnModel } from './column.model';

export declare class FileColumnModel extends DataColumnModel {
	canUpload?: () => boolean;
	hasPreview?: (name: string) => boolean;
}

export declare class FileColumn extends ColumnView {
	constructor(model: ColumnModel);
}
