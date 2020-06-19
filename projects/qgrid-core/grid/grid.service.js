import { GRID_INVALIDATE_COMMAND_KEY, BUSY_COMMAND_KEY, FOCUS_COMMAND_KEY } from '../command-bag/command.bag';

export class GridService {
	constructor(model) {
		this.model = model;
	}

	invalidate(settings) {
		const invalidate = this.findCommand(GRID_INVALIDATE_COMMAND_KEY);
		return invalidate.execute(settings);
	}

	busy() {
		const busy = this.findCommand(BUSY_COMMAND_KEY);
		return busy.execute();
	}

	focus(rowIndex, columnIndex) {
		const focus = this.findCommand(FOCUS_COMMAND_KEY);
		focus.execute({
			rowIndex,
			columnIndex
		});
	}

	findCommand(key) {
		return this
			.model
			.command()
			.items
			.find(cmd => cmd.key === key);
	}
}
