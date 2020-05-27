import { Resource } from '@qgrid/core/resource/resource';

export class ColumnChooserState {
	constructor() {
		this.resource = new Resource();
		this.canAggregate = false;
		this.canSort = true;
	}
}