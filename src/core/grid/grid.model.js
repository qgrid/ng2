import guid from 'core/services/guid';

export default class GridModel {
	constructor() {
		this.id = `q-grid-${guid()}`;
	}
}