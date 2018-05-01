const offset = 100;
const velocity = 5;

export class ScrollService {
	constructor(model, markup) {
		this.model = model;
		this.markup = markup;
		this.interval = null;
		this.setElementsState(markup);
		this.addMouseUpListener();
		this.addWindowResizeListener();
	}

	canScroll(e) {
		if (e.clientY < (this.table.bottom - offset) &&
			e.clientY > (this.table.top + offset) &&
			e.clientX > (this.table.left + offset) &&
			e.clientX < (this.table.right - offset)) {
			this.stop();
		}
	}

	scroll(e) {
		if (this.inBottomArea(e)) {
			if (!this.interval) {
					const downInterval = this.doScroll('bottom', '+');
					this.interval = downInterval();
			}
			return;
		}

		if (this.inTopArea(e)) {
			if (!this.interval) {
					const upInterval = this.doScroll('top', '-');
					this.interval = upInterval();
			}
			return;
		}

		if (this.inRightArea(e)) {
			if (!this.interval) {
					const rightInterval = this.doScroll('right', '+');
					this.interval = rightInterval();
			}
			return;
		}

		if (this.inLeftArea(e)) {
			if (!this.interval) {
					const leftInterval = this.doScroll('left', '-');
					this.interval = leftInterval();
			}
		}

	}

	doScroll(direction, modifier) {
		const scrollVelocity = modifier === '+' ? velocity : velocity * -1;
		const scrollState = this.model.scroll;
		let scrolledToEnd;

		switch (direction) {
			case 'top': {
				scrolledToEnd = this.isScrolledToEndOfTop();
				direction = 'top';
				break;
			}
			case 'bottom': {
				scrolledToEnd = this.isScrolledToEndOfBottom();
				direction = 'top';
				break;
			}
			case 'left': {
				scrolledToEnd = this.isScrolledToEndOfLeft();
				direction = 'left';
				break;
			}
			case 'right': {
				scrolledToEnd = this.isScrolledToEndOfRight();
				direction = 'left';
				break;
			}
		}

		return () => setInterval(() => {
			if(!scrolledToEnd()) {
				const origin = scrollState()[direction];
				scrollState({[direction]: origin + scrollVelocity});
			}
		}, 50);
	}

	inTopArea(e) {
		return e.clientY < (this.table.top + offset) &&
			e.clientX > (this.table.left + offset) &&
			e.clientX < (this.table.right - offset);
	}

	inBottomArea(e) {
		return e.clientY > (this.table.bottom - offset) &&
				e.clientX > (this.table.left + offset) &&
				e.clientX < (this.table.right - offset)
	}

	inLeftArea(e) {
		return e.clientX < (this.table.left + offset) &&
				e.clientY > (this.table.top + offset) &&
				e.clientY < (this.table.bottom - offset)
	}

	inRightArea(e) {
		return e.clientX > (this.table.right - offset) &&
				e.clientY > (this.table.top + offset) &&
				e.clientY < (this.table.bottom - offset)
	}

	isScrolledToEndOfBottom() {
		return () => this.body.scrollHeight - this.body.scrollTop === this.body.clientHeight
	}

	isScrolledToEndOfRight() {
		return () => this.body.scrollLeft === this.body.scrollWidth - this.body.clientWidth;
	}

	isScrolledToEndOfTop() {
		return () => this.body.scrollTop === 0;
	}

	isScrolledToEndOfLeft() {
		return () => this.body.scrollLeft === 0;
	}

	addMouseUpListener() {
		document.addEventListener('mouseup', () => {
			if(this.interval) {
				this.stop();
			}
		})
	}

	addWindowResizeListener() {
		window.addEventListener('resize', () => {
			this.setElementsState(this.markup);
		})
	}

	setElementsState(markup) {
		this.table = markup.table.getBoundingClientRect();
		this.body = markup.body;
	}

	stop() {
		clearInterval(this.interval);
		this.interval = null;
	}
}
