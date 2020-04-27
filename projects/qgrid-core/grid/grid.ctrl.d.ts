import { Model } from '../infrastructure/model';
import { Disposable } from '../infrastructure/disposable';
import { Table } from '../dom/table';

export declare class GridCtrl {
	constructor(
		host: HTMLElement,
		model: Model,
		table: Table,
		disposable: Disposable
	);

	keyDown(e: any, source?: string): string[];
	keyUp(e: any, source?: string): string[];
	invalidateActive(): void;
}
