export class SceneModel {
	constructor() {
		this.rows = [];
		this.column = {
			rows: [],
			line: [],
			area: {
				left: [],
				null: [],
				right: []
			}
		};
	}
}