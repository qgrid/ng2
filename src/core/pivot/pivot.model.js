import Resource from '../resource/resource';

export default class PivotModel {
	constructor() {
		this.resource = new Resource();
		this.by = [];
	}
}