import { Model } from '../infrastructure';
import { View } from '../view/view';
import { Table } from '../dom/table';
import { Bag } from '../dom/bag';

export declare class GridBag {
	head: Bag;
	body: Bag;
	foot: bag;
}

export declare class GridCtrl extends View {
	constructor(model: Model, context: any)

	keyDown(e: any, source = 'grid');
	invalidateActive(): void;

	table: Table;
	bag: GridBag;
	markup: any;
}
