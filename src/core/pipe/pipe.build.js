import { Middleware } from '../services/middleware';
import { getFactory as valueFactory } from '../services/value';
import { getFactory as labelFactory } from '../services/label';

export function build(model) {
	return function run(source, changes, pipe) {
		const middleware = new Middleware(pipe);
		const context = {
			model,
			source,
			changes,
			valueFactory,
			labelFactory
		};

		const { rows } = model.data();
		return middleware.run(context, rows);
	};
}