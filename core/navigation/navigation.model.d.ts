import {ColumnModel} from '../column-type/column.model';

export declare class NavigationModel {
	constructor();

	readonly rowIndex: number;
	readonly columnIndex: number;
	readonly row: any;
	readonly column: ColumnModel;
}
