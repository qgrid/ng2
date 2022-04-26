import { getLabelFactory } from '../services/label';
import { Middleware } from '../services/middleware';
import { getValueFactory } from '../services/value';

export function buildFromModel(model) {
	return function run(source, changes, pipe) {
		const middleware = new Middleware(pipe);
		const context = {
			model,
			source,
			changes,
			valueFactory: getValueFactory,
			labelFactory: getLabelFactory,
		};

		const { rows } = model.data();
		return middleware.run(context, rows);
	};
}
