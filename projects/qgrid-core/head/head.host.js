import { PathService } from '../path/path.service';
import { parents } from '../services/dom';
import { eventPath, elementFromPoint } from '../services/dom';

export class HeadHost {
	constructor(plugin) {
		const { model, table, observeReply } = plugin;

		this.plugin = plugin;
		this.pathFinder = new PathService(table.box.bag.head);

		this.column = null;
		this.clientX = -1;
		this.clientY = -1;

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status')) {
					const { status } = e.state;
					switch (status) {
						case 'start': {
							this.highlight(null);
							break;
						}
						case 'stop': {
							if (this.clientX >= 0 && this.clientY >= 0) {
								const target = elementFromPoint(this.clientX, this.clientY);
								if (target) {
									const path = parents(target);
									const cell = this.pathFinder.cell(path);
									if (cell) {
										this.highlight(cell.column);
										return;
									}
								}

								this.highlight(null);
							}

							break;
						}
					}
				}
			});
	}

	mouseMove(e) {
		const { model } = this.plugin;

		this.clientX = e.clientX;
		this.clientY = e.clientY;

		if (model.scene().status === 'stop') {
			const cell = this.pathFinder.cell(eventPath(e));
			if (cell) {
				this.highlight(cell.column);
			}
		}
	}

	mouseLeave() {
		this.clientX = -1;
		this.clientY = -1;

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

			this.column = column;
			if (column) {
				highlight.column.execute(this.column, true);
			}
		}
	}
}