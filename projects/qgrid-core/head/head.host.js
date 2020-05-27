import { PathService } from '../path/path.service';
import { eventPath } from '../services/dom';

export class HeadHost {
	constructor(plugin) {
		const { model, table, observeReply } = plugin;

		this.plugin = plugin;
		this.column = null;

		observeReply(model.dragChanged)
			.subscribe(e => {
				if (e.hasChanges('isActive')) {
					if(e.state.isActive) {
						this.column = null;
					}
				}
			});
	}

	mouseMove(e) {
		const { table } = this.plugin;

		const pathFinder = new PathService(table.box.bag.head);
		const cell = pathFinder.cell(eventPath(e));
		if (cell) {
			this.highlight(cell.column);
		}
	}

	mouseLeave() {
		this.highlight(null);
	}

	highlight(column) {
		const { view } = this.plugin;

		const { highlight } = view;
		if (!highlight.column.canExecute(column)) {
			return;
		}

		if (this.column !== column) {
			if (this.column) {
				highlight.column.execute(this.column, false);
			}

			if (column) {
				highlight.column.execute(column, true);
			}

			this.column = column;
		}
	}
}