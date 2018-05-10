import { View } from '../view';
import { EventListener, EventManager } from '../../core/infrastructure';
import { AppError } from '../infrastructure/error';
import { jobLine } from '../services/job.line';

const offset = 50;
const velocity = 5;

export class ScrollService extends View {
	constructor(model, table) {
		super(model);

		this.table = table;
		this.interval = null;
		this.rect = null;
		this.body = null;
		this.job = jobLine(0);

		const documentListener = new EventListener(document, new EventManager(this));
		const windowListener = new EventListener(window, new EventManager(this));

		this.using(documentListener.on('mouseup', () => {
			if (this.interval) {
				this.stop();
			}
		}));

		this.using(windowListener.on('resize', () => {
			this.setElementsState();
		}));
	}

	canScroll(e) {
		const table = this.rect;

		return !(e.clientY < (table.bottom - offset) &&
		e.clientY > (table.top + offset) &&
		e.clientX > (table.left + offset) &&
		e.clientX < (table.right - offset))
	}

	scroll(e) {
		if(this.interval) {
			if (!this.canScroll(e)) {
				this.stop();
				return;
			}
		}

		const direction = this.onEdgeOf(e);
		if (direction && !this.interval) {
			this.job(() => {
				const interval = this.doScroll(direction);
				this.interval = interval();
			})
		}

	}

	doScroll(direction) {
		const scrollState = this.model.scroll;
		const scrolledToEnd = () => this.isScrolledToEnd(direction);

		return () => setInterval(() => {
			if(!scrolledToEnd()) {
				switch(direction) {
					case 'right':
					case 'bottom': {
						const course = direction === 'bottom' ? 'top' : 'left';
						const origin = scrollState()[course];
						scrollState({[course]: origin + velocity});
						break;
					}
					case 'left':
					case 'top': {
						const course = direction === 'top' ? 'top' : 'left';
						const origin = scrollState()[course];
						scrollState({[course]: origin - velocity});
						break;
					}
					default: {
						throw new AppError('scroll.service', `doScroll: Wrong direction`);
					}
				}
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
			default: {
				throw new AppError('scroll.service', `isScrolledToEnd: Wrong direction`);
			}
		}
	}

	onEdgeOf(e) {
		const table = this.rect;

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

		return false;
	}

	setElementsState() {
		const view = this.table.view;

		this.body = view.markup.body;
		this.rect = view.rect(this.body);
	}

	stop() {
		clearInterval(this.interval);
		this.interval = null;
	}
}
