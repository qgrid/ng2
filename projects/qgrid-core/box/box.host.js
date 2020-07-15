import { GRID_PREFIX } from '../definition';
import { DRAG_CHECK_COMMAND_KEY } from '../command-bag/command.bag';

export class BoxHost {
	constructor(host, plugin) {
		const { model, observeReply, commandPalette } = plugin;

		observeReply(model.dragChanged)
			.subscribe(e => {
				if (e.hasChanges('isActive')) {
					const dragCheck = commandPalette.get(DRAG_CHECK_COMMAND_KEY);
					dragCheck.execute(host);
				}
			});
	}
}