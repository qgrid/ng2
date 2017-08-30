import {Middleware} from '../services/middleware';

export function build(model, valueFactory) {
	return function run(source, changes, pipe) {
		const pipes = pipe || model.data().pipe;
		const middleware = new Middleware(pipes);
		const context = {
			model: model,
			source: source,
			valueFactory: valueFactory,
			changes: changes
		};

		return middleware.run(context, model.data().rows);
	};
}