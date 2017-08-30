export class Middleware {
	constructor(pipes) {
		this.pipes = pipes;
	}

	run(context, memo = []) {
		const pipes = this.pipes
			.map(pipe => memo =>
				new Promise((resolve, reject) =>
					pipe(memo, context, resolve, reject)));

		return start(pipes, memo);
	}
}

function start(pipes, memo) {
	pipes = Array.from(pipes);
	return new Promise((resolve, reject) => {
		invoke(memo);

		function invoke(memo) {
			if (pipes.length) {
				const pipe = pipes.shift();
				const promise = pipe(memo);
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