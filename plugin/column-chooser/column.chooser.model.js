import {Resource} from '@grid/core/resource';

export class ColumnChooserModel {
	constructor() {
		this.resource = new Resource();
		this.canAggregate = false;
		this.canSort = true;
	}
}