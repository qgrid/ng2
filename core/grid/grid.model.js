import {guid} from '../services';

export class GridModel {
	constructor() {
		this.id = `q-grid-${guid()}`;
		this.status = 'unbound'; //unbound | bound
		this.title = '';
	}
}