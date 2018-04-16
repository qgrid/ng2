import { Table } from '../dom/table';
import { Model } from '../infrastructure/model';

export class EditService {
	constructor(model: Model, table: Table);
	startBatchEdit(): void;
	endBatchEdit(): void;
	doBatch(startCell: any): void;
}
