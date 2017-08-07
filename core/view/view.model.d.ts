import {ColumnModel} from "../column-type/column.model";
import {IPivot} from "../pipe/column.pipe";

export declare class ViewModel {
	constructor();

	items: any[];
	rows: any[];
	columns: ColumnModel[];
	nodes: Node[];
	pivot: IPivot;
}