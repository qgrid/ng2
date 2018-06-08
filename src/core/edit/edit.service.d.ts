import { Table } from '../dom/table';
import { Model } from '../infrastructure/model';
import { Td } from '../dom/td';

export class EditService {
	constructor(model: Model, table: Table);
	
	doBatch(startCell: Td): void;
}
