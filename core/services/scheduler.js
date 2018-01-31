export class Scheduler {
	constructor() {
		this.tasks = [];
	}

	next() {
		this.tasks.shift();
		const task = this.tasks[0];
		if (task) {
			task();
			return true;
		}

		return false;
	}

	add(task) {
		this.tasks.push(task);
		if (this.tasks.length === 1) {
			task();
		}
	}
}