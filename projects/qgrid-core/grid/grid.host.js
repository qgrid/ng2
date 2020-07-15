
import { GridError } from '../infrastructure/error';

export class GridHost {
	constructor(host, plugin) {
		const { model, disposable } = plugin;

		if (model.grid().status === 'bound') {
			throw new GridError(
				'grid.host',
				`Model is already used by grid "${model.grid().id}"`
			);
		}

		if (!host.id) {
			host.id = model.grid().id;
		}

		model.grid({
			status: 'bound'
		}, {
			source: 'grid.host'
		});

		disposable.add(() =>
			model.grid({
				status: 'unbound'
			}, {
				source: 'grid.host'
			})
		);
	}
}
