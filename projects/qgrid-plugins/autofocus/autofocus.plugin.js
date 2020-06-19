import { filter, takeOnce } from '@qgrid/core/rx/rx.operators';
import { FOCUS_COMMAND_KEY } from '@qgrid/core/command-bag/command.bag';

export class AutofocusPlugin {
	constructor(plugin) {
		const { model, table, observeReply, commandPalette } = plugin;

		observeReply(model.sceneChanged)
			.pipe(
				filter(e => {
					if (e.hasChanges('status') && e.state.status === 'stop') {
						const count = table.body.rowCount(0);
						if (count) {
							return true
						}
					}

					return false
				}),
				takeOnce()
			)
			.subscribe(() => {
				const focus = commandPalette.get(FOCUS_COMMAND_KEY);
				if (focus.canExecute()) {
					focus.execute();
				}
			});
	}
}
