import { Model } from '../infrastructure/model';
import { View } from '../view/view';
import { Table } from '../dom/table';
import { Bag } from '../dom/bag';

export declare class GridBag {
	head: Bag;
	body: Bag;
	foot: Bag;
}

export declare class GridCtrl extends View {
	constructor(model: Model, context: any);

	keyDown(e: any, source?: string);
	invalidateActive(): void;

	table: Table;
	bag: GridBag;
	markup: any;
}
