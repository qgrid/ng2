import { Node } from '../node/node';

export class ViewState {
	constructor() {
		this.rows = [];
		this.columns = [];
		this.nodes = [];
		this.pivot = { head: new Node('$root', 0), rows: [] };
	}
}