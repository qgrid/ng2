import { Table } from '../dom/table';
import { Model } from '../infrastructure/model';
import { Td } from '../dom/td';
import { CellView } from '../scene/view/cell.view';

export class EditService {
	constructor(model: Model, table: Table);
	
	doBatch(startCell: CellView): void;
}
