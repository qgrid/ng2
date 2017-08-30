import {Model} from '../infrastructure/model';

export declare class Row {
	constructor(row: any);
	row: any;
	index: number;
	readonly model: Model;
	static equals(x: any, y: any): boolean;
}
