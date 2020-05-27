import { CellView } from '../scene/view/cell.view';
import { GridPlugin } from '@qgrid/ngx';

export class EditService {
	constructor(plugin: GridPlugin);

	startBatch(startCell: CellView): () => void;
}
