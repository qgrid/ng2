import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

export declare class ScrollService {
	constructor(model: Model, table: Table);
	interval: number;
	canScroll(e: MouseEvent): void;
}
