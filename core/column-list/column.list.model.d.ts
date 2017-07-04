import {ColumnModel} from "../column-type/column.model";

export declare type GenerationMode = 'deep' | 'shallow';

export declare class ColumnListModel {
	constructor();

	generation: GenerationMode; // deep | shallow
	index: string[];
	columns: ColumnModel[];
	reference: object;

}