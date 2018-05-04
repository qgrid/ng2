import { View } from '../view';
import { EventListener, EventManager } from '../../core/infrastructure';

const offset = 50;
const velocity = 5;

export class ScrollService extends View {
	constructor(model, table) {
		super(model);

		this.table = table;
		this.interval = null;
		this.setElementsState(table.view);

		const documentListener = new EventListener(document, new EventManager(this));
		const windowListener = new EventListener(window, new EventManager(this));

		this.using(documentListener.on('mouseup', () => {
			if (this.interval) {
				this.stop();
			}
		}));

		this.using(windowListener.on('resize', () => {
			this.setElementsState(this.getMarkup());
		}));
	}

	getMarkup() {
		return this.table.view.markup;
	}

	canScroll(e) {
		const table = this.table;

		if (e.clientY < (table.bottom - offset) &&
			e.clientY > (table.top + offset) &&
			e.clientX > (table.left + offset) &&
			e.clientX < (table.right - offset)) {
			this.stop();
		}
	}

	scroll(e) {
		if (!this.interval) {
			const area = this.detectArea(e);

			switch (area) {
				case 'top': {
					const interval = this.doScroll('top', '-');
					this.interval = interval();
					break;
				}
				case 'bottom': {
					const interval = this.doScroll('bottom', '+');
					this.interval = interval();
					break;
				}
				case 'left': {
					const interval = this.doScroll('left', '-');
					this.interval = interval();
					break;
				}
				case 'right': {
					const interval = this.doScroll('right', '+');
					this.interval = interval();
				}
			}
		}
	}

	doScroll(direction, modifier) {
		const scrollVelocity = modifier === '+' ? velocity : velocity * -1;
		const scrollState = this.model.scroll;
		let scrolledToEnd;

		switch (direction) {
			case 'top': {
				scrolledToEnd = () => this.isScrolledToEnd('top');
				direction = 'top';
				break;
			}
			case 'bottom': {
				scrolledToEnd = () => this.isScrolledToEnd('bottom');
				direction = 'top';
				break;
			}
			case 'left': {
				scrolledToEnd = () => this.isScrolledToEnd('left');
				direction = 'left';
				break;
			}
			case 'right': {
				scrolledToEnd = () => this.isScrolledToEnd('right');
				direction = 'left';
			}
		}

		return () => setInterval(() => {
			if(!scrolledToEnd()) {
				const origin = scrollState()[direction];
				scrollState({[direction]: origin + scrollVelocity});
			}
		}, 50);
	}

	isScrolledToEnd(direction) {
		const body = this.body;

		switch (direction) {
			case 'top': {
				return body.scrollTop === 0;
			}
			case 'bottom': {
				return body.clientHeight === body.scrollHeight - body.scrollTop;
			}
			case 'left': {
				return body.scrollLeft === 0;
			}
			case 'right': {
				return body.scrollLeft === body.scrollWidth - body.clientWidth;
			}
		}
	}

	detectArea(e) {
		const table = this.table;

		if (e.clientY < (table.top + offset) &&
			e.clientX > (table.left + offset) &&
			e.clientX < (table.right - offset)) {
			return 'top';
		}

		if (e.clientY > (table.bottom - offset) &&
			e.clientX > (table.left + offset) &&
			e.clientX < (table.right - offset)) {
			return 'bottom';
		}

		if (e.clientX < (table.left + offset) &&
			e.clientY > (table.top + offset) &&
			e.clientY < (table.bottom - offset)) {
			return 'left';
		}

		if (e.clientX > (table.right - offset) &&
			e.clientY > (table.top + offset) &&
			e.clientY < (table.bottom - offset)) {
			return 'right';
		}
	}

	setElementsState(view) {
		this.body = view.markup.body;
		this.table = view.rect(this.body);
	}

	stop() {
		clearInterval(this.interval);
		this.interval = null;
	}
}
