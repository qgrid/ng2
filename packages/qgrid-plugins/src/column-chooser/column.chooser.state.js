import { Resource } from '@qgrid/core';

export class ColumnChooserState {
	constructor() {
		this.resource = new Resource();
		this.canAggregate = false;
		this.canSort = true;
	}
}
