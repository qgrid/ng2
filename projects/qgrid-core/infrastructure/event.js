export class Event {
	constructor(reply = () => null) {
		this.handlers = [];
		this.isDirty = false;
		this.reply = reply;
	}

	on(next, lifecycle = 'app') {
		const { handlers } = this;
		const handler = { next };
		const off = () => {
			const index = handlers.indexOf(handler);
			if (index >= 0) {
				handlers.splice(index, 1);
			}
		};

		handler.off = off;
		handler.lifecycle = lifecycle;
		handlers.push(handler);

		return off;
	}

	watch(next, lifecycle = 'app') {
		const off = this.on(next, lifecycle);
		if (this.isDirty) {
			const e = this.reply();
			next(e, off);
		}

		return off;
	}

	emit(e) {
		this.isDirty = true;
		const temp = Array.from(this.handlers);
		for (let i = 0, length = temp.length; i < length; i++) {
			const handler = temp[i];
			handler.next(e, handler.off);
		}
	}
}