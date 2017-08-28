import {ColumnModel} from '../column-type/column.model';
import {IPivot} from '../pipe/pipe.item';

export declare class ViewModel {
	constructor();

	rows: any[];
	columns: ColumnModel[];
	nodes: Node[];
	pivot: IPivot;
}
