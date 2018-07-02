export class SceneModel {
	constructor() {
		this.status = 'stop'; // start | pull | push | stop
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