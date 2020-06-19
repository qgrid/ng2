import { GRID_PREFIX } from '../definition';
import { jobLine } from '../services/job.line';

const VERTICAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-vertical`;
const HORIZONTAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-horizontal`;

export class BodyHost {
	constructor(plugin) {
		this.plugin = plugin;
		this.scrollingJob = jobLine(100);
	}

	scroll(e) {
		const { model, table } = this.plugin;
		const { scroll } = model;

		const oldValue = scroll();
		const newValue = {};
		let hasChanges = false;
		if (oldValue.top !== e.scrollTop) {
			table.view.addClass(VERTICAL_SCROLL_CLASS);
			newValue.top = e.scrollTop;
			hasChanges = true;
		}

		if (oldValue.left !== e.scrollLeft) {
			table.view.addClass(HORIZONTAL_SCROLL_CLASS);
			newValue.left = e.scrollLeft;
			hasChanges = true;
		}

		if (hasChanges) {
			scroll(newValue, {
				source: 'body.core',
				behavior: 'core'
			});
		}

		this.scrollingJob(this.scrollEnd.bind(this));
	}

	scrollEnd() {
		const { table } = this.plugin;

		table.view.removeClass(VERTICAL_SCROLL_CLASS);
		table.view.removeClass(HORIZONTAL_SCROLL_CLASS);
	}
}
