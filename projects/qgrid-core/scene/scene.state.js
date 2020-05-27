export class SceneState {
	constructor() {
		this.status = 'idle'; // idle | start | pull | push | stop
		this.rows = [];
		this.column = {
			rows: [],
			line: [],
			area: {
				left: [],
				mid: [],
				right: []
			}
		};
	}
}