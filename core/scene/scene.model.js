export class SceneModel {
	constructor() {
		this.status = 'stop'; // start | stop
		this.round = 0;
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