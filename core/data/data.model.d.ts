import {PipeUnit} from '../pipe/units/pipe.unit';
import {ColumnModel} from "../column-type/column.model";

export declare class DataModel {
	constructor();

	rows: any[];
	columns: ColumnModel[];
	pipe: PipeUnit;
	triggers: string[];
}