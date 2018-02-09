import { GRID_PREFIX } from '../definition';
import * as css from '../services/css';

export class ThCtrl {
	static classify(element, column) {
		if (column.canEdit) {
			element.classList.add(css.escapeAttr(`${GRID_PREFIX}-can-edit`));
		}

		if (column.canResize) {
			element.classList.add(css.escapeAttr(`${GRID_PREFIX}-can-resize`));
		}

		if (column.canSort) {
			element.classList.add(css.escapeAttr(`${GRID_PREFIX}-can-sort`));
		}

		if (column.canMove) {
			element.classList.add(css.escapeAttr(`${GRID_PREFIX}-can-move`));
		}

		if (column.canFilter) {
			element.classList.add(css.escapeAttr(`${GRID_PREFIX}-can-filter`));
		}

		if (column.canHighlight) {
			element.classList.add(css.escapeAttr(`${GRID_PREFIX}-can-highlight`));
		}
	}
}