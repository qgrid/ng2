export class Event {
	constructor(e = () => null) {
		this.handlers = [];
		this.isDirty = false;
		this.e = e;
	}

	on(f, lifecycle = 'app') {
		const handlers = this.handlers;
		const handler = {f: f};
		const off = () => {
			console.log(`off: ${f}`);
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

	watch(f, lifecycle = 'app') {
		const off = this.on(f, lifecycle);
		if (this.isDirty) {
			f(this.e(), off);
		}

		return off;
	}

	emit(e) {
		this.isDirty = true;
		const temp = Array.from(this.handlers);
		for (let i = 0, length = temp.length; i < length; i++) {
			const handler = temp[i];
			handler.f(e, handler.off);
		}
	}

	dispose(lifecycle = null) {
		const temp = Array.from(this.handlers);
		for (let i = 0, length = temp.length; i < length; i++) {
			const handler = temp[i];
			if (!lifecycle || handler.lifecycle === lifecycle) {
				handler.off();
			}
		}
	}
}