export class ColumnListModel {
	constructor() {
		this.generation = null; // deep | shallow | cohort
		this.index = [];
		this.columns = [];
		this.reference = {};
		this.line = [];
	}
}