export class Event {
	constructor(e = () => null) {
		this.handlers = [];
		this.isDirty = false;
		this.e = e;
	}

	on(f) {
		const handlers = this.handlers;
		handlers.push(f);
		return () => {
			const index = handlers.indexOf(f);
			if (index >= 0) {
				handlers.splice(index, 1);
			}
		};
	}

	watch(f) {
		if(this.isDirty) {
			f(this.e());
		}

		return this.on(f);
	}

	emit(e) {
		this.isDirty = true;
		const temp = Array.from(this.handlers);
		for (let i = 0, length = temp.length; i < length; i++) {
			temp[i](e);
		}
	}
}