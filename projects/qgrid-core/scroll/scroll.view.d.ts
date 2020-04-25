import { Model } from '../infrastructure/model';
import { Defer } from '../infrastructure/defer';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';

export declare class VscrollContext {
	settings: {
		threshold?: number;
		resetTriggers?: Array<string>;
		rowHeight?: number | ((element: HTMLElement) => number);
		columnWidth?: number | ((element: HTMLElement) => number);

		fetch?: (skip: number, take: number, d: Defer) => void;
		emit?: (f: () => void) => void;
	};

	container: {
		count: number;
		total: number;
		position: number;
		cursor: number;
		items: any[];
		force: boolean;

		reset(): void;
		update(count: number): void;
	};

	id: (index: number) => number;
}


export declare class ScrollView {
	constructor(model: Model, table: Table, vscroll: VscrollContext, gridService: GridService);

	readonly mode: 'virtual' | 'default';
	readonly y: VscrollContext;
}
