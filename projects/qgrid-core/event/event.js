export class Event {
	constructor(reply) {
		this.handlers = [];

		this.lastArg = null;
		this.reply = reply || (() => this.lastArg);
	}

	on(next, lifecycle = 'app') {
		const { handlers } = this;

		const handler = { next, lifecycle };
		const off = () => {
			const index = handlers.indexOf(handler);
			if (index >= 0) {
				handlers.splice(index, 1);
			}
		};

		handler.off = off;
		handlers.push(handler);

		return off;
	}

	watch(next, lifecycle = 'app') {
		const off = this.on(next, lifecycle);
		if (this.lastArg) {
			const e = this.reply();
			next(e, off);
		}

		return off;
	}

	emit(value) {
		this.lastArg = value;

		const handlers = Array.from(this.handlers);
		for (let i = 0, length = handlers.length; i < length; i++) {
			const handler = handlers[i];
			handler.next(value, handler.off);
		}
	}
}