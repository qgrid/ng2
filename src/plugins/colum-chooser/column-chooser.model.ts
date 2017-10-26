import {Resource} from 'ng2-qgrid/core/resource/resource';

export class ColumnChooserModel {
	canAggregate: boolean;
	resource: Resource;

	constructor() {
		this.resource = new Resource();
		this.canAggregate = false;
	}
}
