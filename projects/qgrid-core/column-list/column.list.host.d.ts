import { Model } from '../model/model';
import { ColumnModel } from '../column-type/column.model';

export declare class ColumnListHost {
	constructor(
		model: Model,
		canCopy: (key: string, source: any, target: any) => boolean,
		parseFactory: (type: string, source: any) => (v: any) => any
	)

	copy(target: any, source: any): void;
	add(column: ColumnModel): void;
	register(column: ColumnModel): void;
	generateKey(source: any): string;
	extract(key: string, type: string): ColumnModel;
	delete(key: string);
}
