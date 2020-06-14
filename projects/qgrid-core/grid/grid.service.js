import { FocusService } from '../focus/focus.service';
import { GRID_INVALIDATE_COMMAND_KEY } from '../command-bag/grid.invalidate.command';
import { GRID_BUSY_COMMAND_KEY } from '../command-bag/grid.busy.command';

export class GridService {
	constructor(model) {
		this.model = model;
	}

	invalidate(settings) {
		const invalidate = this.findCommand(GRID_INVALIDATE_COMMAND_KEY);
		return invalidate.execute(settings);
	}

	busy() {
		const busy = this.findCommand(GRID_BUSY_COMMAND_KEY);
		return busy.execute();
	}

	focus(rowIndex, columnIndex) {
		const focus = new FocusService(this.model);
		focus.activate(rowIndex, columnIndex);
	}

	findCommand(key) {
		return this
			.model
			.command()
			.items
			.find(cmd => cmd.key === key);
	}
}
