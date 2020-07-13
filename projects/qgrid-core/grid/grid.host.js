
import { GridError } from '../infrastructure/error';
import { VISIBILITY_CHECK_COMMAND_KEY } from '../command-bag/command.bag';

export class GridHost {
	constructor(host, plugin) {
		const { model, disposable, observe, commandPalette } = plugin;
		const { grid } = model;
		const visibilityCheck = commandPalette.get(VISIBILITY_CHECK_COMMAND_KEY);


		this.plugin = plugin;

		if (grid().status === 'bound') {
			throw new GridError(
				'grid.host',
				`Model is already used by grid "${grid().id}"`
			);
		}

		if (!host.id) {
			host.id = model.grid().id;
		}

		grid({
			status: 'bound'
		}, {
			source: 'grid.host'
		});

		visibilityCheck.execute();
		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					visibilityCheck.execute();
				}
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
