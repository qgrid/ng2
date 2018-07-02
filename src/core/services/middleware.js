export class Middleware {
	constructor(pipes) {
		this.pipes = pipes;
	}

	run(context, memo = []) {
		const tasks = this.pipes
			.map(pipe => memo =>
				new Promise((resolve, reject) =>
					pipe(memo, context, resolve, reject)));

		return start(tasks, memo);
	}
}

function start(tasks, memo) {
	tasks = Array.from(tasks);
	return new Promise((resolve, reject) => {
		invoke(memo);

		function invoke(memo) {
			if (tasks.length) {
				const task = tasks.shift();
				const promise = task(memo);
				promise
					.then(invoke)
					.catch(ex => {
						reject(ex);
						throw ex;
					});
			}
			else {
				resolve(memo);
			}
		}
	});
}