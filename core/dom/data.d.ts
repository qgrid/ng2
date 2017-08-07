import {Model} from "../infrastructure/model";
import {IMapResult} from "../column/column.service";
import {Column} from "./column";

export declare class Data {
	constructor(public model: Model);

	columns(): Column[];

	columnMap(): IMapResult;

	rows(): any[];
}