import { GRID_PREFIX } from '../definition';
import { escapeAttr } from '../services/css';
import { Fastdom } from '../services/fastdom';

export class ThCtrl {
	static classify(element, column) {
		Fastdom.mutate(() => {
			if (column.canEdit) {
				element.classList.add(escapeAttr(`${GRID_PREFIX}-can-edit`));
			}

			if (column.canResize) {
				element.classList.add(escapeAttr(`${GRID_PREFIX}-can-resize`));
			}

			if (column.canSort) {
				element.classList.add(escapeAttr(`${GRID_PREFIX}-can-sort`));
			}

			if (column.canMove) {
				element.classList.add(escapeAttr(`${GRID_PREFIX}-can-move`));
			}

			if (column.canFilter) {
				element.classList.add(escapeAttr(`${GRID_PREFIX}-can-filter`));
			}

			if (column.canHighlight) {
				element.classList.add(escapeAttr(`${GRID_PREFIX}-can-highlight`));
			}
		});
	}
}