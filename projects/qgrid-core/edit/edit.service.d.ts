import { CellView } from '../scene/view/cell.view';
import { GridPlugin } from '../plugin/grid.plugin';

export class EditService {
	constructor(plugin: GridPlugin);

	startBatch(startCell: CellView): () => void;
}
