import { GRID_PREFIX } from '../definition';
import { guid } from '../services/guid';

export class GridState {
	constructor() {
		this.id = `${GRID_PREFIX}-${guid()}`;
		this.status = 'unbound'; // unbound | bound
		this.caption = '';
		this.interactionMode = 'full' | 'readonly' | 'detached';

		// @deprecated
		this.title = '';
	}
}
