import { View } from '../view/view';
import { Model } from '../infrastructure/model';
import { ColumnModel } from '../column-type/column.model';

export declare class ColumnListCtrl extends View {
	constructor(model: Model,
		canCopy: (key: string, source: any, target: any) => boolean,
		parseFactory: (type: string, source: any) => (v: any) => any)

	copy(target: any, source: any): void;
	add(column: ColumnModel): void;
	register(column: ColumnModel): void;
	generateKey(source: any): string;
	extract(key: string, type: string): ColumnModel;
}
