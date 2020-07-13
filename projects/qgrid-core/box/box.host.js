import { GRID_PREFIX } from '../definition';
import { DRAG_CHECK_COMMAND_KEY } from '../command-bag/command.bag';

export class BoxHost {
	constructor(host, plugin) {
		const { model, observeReply, commandPalette } = plugin;
		const dragCheck = commandPalette.get(DRAG_CHECK_COMMAND_KEY);

		host.classList.add(GRID_PREFIX);

		observeReply(model.dragChanged)
			.subscribe(e => {
				if (e.hasChanges('isActive')) {
					dragCheck.execute(host);
				}
			});
	}
}