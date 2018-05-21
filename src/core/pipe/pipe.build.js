import { Middleware } from '../services/middleware';
import { getFactory as valueFactory } from '../services/value';
import { getFactory as labelFactory } from '../services/label';

export function build(model) {
	return function run(source, changes, pipe) {
		const pipes = pipe || model.data().pipe;
		const middleware = new Middleware(pipes);
		const context = {
			model: model,
			source: source,
			valueFactory: valueFactory,
			labelFactory: labelFactory,
			changes: changes
		};

		return middleware.run(context, model.data().rows);
	};
}