import { Node } from '../node/node';

export class ColumnListModel {
	constructor() {
		this.generation = null; // deep | shallow | cohort
		this.index = new Node('$root', 0);
		this.columns = [];
		this.reference = {};
		this.line = [];
	}
}