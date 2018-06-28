import { Model } from '../infrastructure/model';
import { Defer } from '../infrastructure/defer';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';

/**
 * > Under Construction.
 */
export declare class ScrollView {
	constructor(model: Model, table: Table, vscroll: any, gridService: GridService);

	readonly mode: 'virtual' | 'default';
	readonly y: {
		container: {
			position: number, 
			force: boolean, 
			items: any[], 
			cursor: number, 
			update: (count: number) => void 
		},
		settings: {
			threshold: number;		
			resetTriggers: Array<string>;
			rowHeight: number | ((element: HTMLElement) => number);
			columnWidth: number | ((element: HTMLElement) => number);
			fetch: (skip: number, take: number, d: Defer) => void;
		}
	}

	invalidate(): void;
}
