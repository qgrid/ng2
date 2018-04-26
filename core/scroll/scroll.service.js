const offset = 100;
const velocity = 5;

export class ScrollService {
	constructor(model) {
		this.model = model;
		this.tableCenter = document.querySelector('.q-grid-table-center');
		this.tableCenterRect = this.tableCenter.getBoundingClientRect();
		this.interval = null;
		this.tBody = null;
		this.addMouseUpListener();
	}

	checkScroll(e) {
		if (e.clientY < (this.tableCenterRect.bottom - offset) &&
			e.clientY > (this.tableCenterRect.top + offset) &&
			e.clientX > (this.tableCenterRect.left + offset) &&
			e.clientX < (this.tableCenterRect.right - offset)) {
			this.stop();
		}
	}

	triggerScroll(e) {
		if (this.inBottomArea(e)) {
			if (!this.interval) {
					const downInterval = this.scrollDownInterval();
					this.interval = downInterval();
			}
			return;
		}

		if (this.inTopArea(e)) {
			if (!this.interval) {
					const upInterval = this.scrollUpInterval();
					this.interval = upInterval();
			}
			return;
		}

		if (this.inRightArea(e)) {
			if (!this.interval) {
					const rightInterval = this.scrollRightInterval();
					this.interval = rightInterval();
			}
			return;
		}

		if (this.inLeftArea(e)) {
			if (!this.interval) {
					const leftInterval = this.scrollLeftInterval();
					this.interval = leftInterval();
			}
			return;
		}

	}

	scrollDownInterval() {
		return () => setInterval(() => {
			if(!this.isScrolledToEndOfBottom()) {
				const originY = this.model.scroll().top;
				this.model.scroll({top: originY + velocity});
			}
		}, 50);
	}

	scrollUpInterval() {
		return () => setInterval(() => {
			if(!this.isScrolledToEndOfTop()) {
				const originY = this.model.scroll().top;
				this.model.scroll({top: originY - velocity});
			}
		}, 50);
	}

	scrollLeftInterval() {
		return () => setInterval(() => {
			if(!this.isScrolledToEndOfLeft()) {
				const originX = this.model.scroll().left;
				this.model.scroll({left: originX - velocity});
			}
		}, 50);
	}

	scrollRightInterval() {
		return () => setInterval(() => {
			if(!this.isScrolledToEndOfRight()) {
				const originX = this.model.scroll().left;
				this.model.scroll({left: originX + velocity});
			}
		}, 50);
	}

	inTopArea(e) {
		return e.clientY < (this.tableCenterRect.top + offset) &&
			e.clientX > (this.tableCenterRect.left + offset) &&
			e.clientX < (this.tableCenterRect.right - offset);
	}

	inBottomArea(e) {
		return e.clientY > (this.tableCenterRect.bottom - offset) &&
				e.clientX > (this.tableCenterRect.left + offset) &&
				e.clientX < (this.tableCenterRect.right - offset)
	}

	inLeftArea(e) {
		return e.clientX < (this.tableCenterRect.left + offset) &&
				e.clientY > (this.tableCenterRect.top + offset) &&
				e.clientY < (this.tableCenterRect.bottom - offset)
	}

	inRightArea(e) {
		return e.clientX > (this.tableCenterRect.right - offset) &&
				e.clientY > (this.tableCenterRect.top + offset) &&
				e.clientY < (this.tableCenterRect.bottom - offset)
	}

	isScrolledToEndOfBottom() {
		return this.tBody.scrollHeight - this.tBody.scrollTop === this.tBody.clientHeight
	}

	isScrolledToEndOfTop() {
		return this.tBody.scrollTop === 0;
	}

	isScrolledToEndOfLeft() {
		return this.tBody.scrollLeft === 0;
	}

	isScrolledToEndOfRight() {
		return this.tBody.scrollLeft === this.tBody.scrollWidth - this.tBody.clientWidth;
	}

	addMouseUpListener() {
		document.addEventListener('mouseup', () => {
			if(this.interval) {
				this.stop();
			}
		})
	}

	stop() {
		clearInterval(this.interval);
		this.interval = null;
	}

	getTBody() {
		const tbody = this.tableCenter.children;

		for (let item of tbody) {
			if (item.tagName === 'TABLE') {
				this.tBody = item.tBodies[0];
			}
		}
	}

}
