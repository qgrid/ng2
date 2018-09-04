import { Node } from '../node/node';
import { CohortColumn, CohortColumnModel } from '../column-type/cohort.column';

export class ColumnListModel {
	constructor() {
		this.generation = null; // deep | shallow | cohort

		const root = new CohortColumnModel();
		root.key = '$root';

		this.index = new Node(new CohortColumn(root), 0);
		this.columns = [];
		this.reference = {};
		this.line = [];
	}
}
