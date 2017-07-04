import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";
import {Cell} from "./cell";

export declare class CellSelector {
	constructor(public model: Model, public table: Table);

	map(items: any[]): Cell[];

}