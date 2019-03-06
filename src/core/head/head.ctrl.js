import { PathService } from '../path/path.service';
import { parents } from '../services/dom';
import { eventPath, elementFromPoint } from '../services/dom';

export class HeadCtrl {
	constructor(model, view, bag) {
		this.model = model;
		this.view = view;
		this.bag = bag;
		this.column = null;
		this.pathFinder = new PathService(this.bag.head);
		this.x = -1;
		this.y = -1;

		model.sceneChanged.watch(e => {
			if (e.hasChanges('status')) {
				const { status } = e.state;
				switch (status) {
					case 'start': {
						this.highlight(null);
						break;
					}
					case 'stop': {
						if (this.x >= 0 && this.y >= 0) {
							const target = elementFromPoint(this.x, this.y);
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

	onMouseMove(e) {
		this.x = e.clientX;
		this.y = e.clientY;

		if (this.model.scene().status === 'stop') {
			const cell = this.pathFinder.cell(eventPath(e));
			if (cell) {
				this.highlight(cell.column);
			}
		}
	}

	onMouseLeave() {
		this.x = -1;
		this.y = -1;
		this.highlight(null);
	}

	highlight(column) {
		const { highlight } = this.view;
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