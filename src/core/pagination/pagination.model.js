import Resource from '../resource/resource';

export default class PaginationModel {
	constructor() {
		this.resource = new Resource();
		this.current = 0;
		this.size = 50;
		this.sizeList = [5, 10, 20, 30, 40, 50];
		this.count = 0;
	}
}
