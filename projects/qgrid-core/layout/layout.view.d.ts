import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';
import { Disposable } from '../infrastructure/disposable';


export declare class LayoutView {
	constructor(
		model: Model,
		table: Table,
		gridService: GridService,
		disposable: Disposable
	);
}
