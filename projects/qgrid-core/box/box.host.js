import { GRID_PREFIX } from '../definition';

export class BoxHost {
	constructor(host, plugin) {
		const { model, observeReply } = plugin;

		host.classList.add(GRID_PREFIX);

		observeReply(model.dragChanged)
			.subscribe(e => {
				if (e.hasChanges('isActive')) {
					if (model.drag().isActive) {
						host.classList.add(`${GRID_PREFIX}-drag`);
					}
					else {
						host.classList.remove(`${GRID_PREFIX}-drag`);
					}
				}
			});
	}
}