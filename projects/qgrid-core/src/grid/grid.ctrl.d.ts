import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { Bag } from '../dom/bag';
import { Disposable } from '../infrastructure/disposable';

export declare class GridBag {
	head: Bag;
	body: Bag;
	foot: Bag;
}

export declare class GridCtrl {
	constructor(
		model: Model,
		context: { element: HTMLElement, layerFactory: () => any },
		disposable: Disposable
	);

	table: Table;
	bag: GridBag;
	markup: { [key: string]: HTMLElement };

	keyDown(e: any, source?: string): string[];
	keyUp(e: any, source?: string): string[];
	invalidateActive(): void;
}
