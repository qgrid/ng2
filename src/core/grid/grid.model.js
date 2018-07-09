import { guid } from '../services/guid';
import { GRID_PREFIX } from '../definition';

export class GridModel {
	constructor() {
		this.id = `${GRID_PREFIX}-${guid()}`;
		this.status = 'unbound'; //unbound | bound
		this.caption = '';
		this.interactionMode = 'full' | 'readonly' | 'detached';

		// @deprecated
		this.title = '';
	}
}