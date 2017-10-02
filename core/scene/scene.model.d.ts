import {ColumnView} from './view/column.view';
import {RowView} from './view/row.view';

export declare class SceneModel {
	constructor();

	status: 'string';
	rows: RowView[];
	column: {
		rows: ColumnView[][],
		line: ColumnView[],
		area: {}
	};
}
