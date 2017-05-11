export class EventListener {
	constructor(context, element) {
		this.element = element;
		this.context = context;
		this.handlers = {};
	}

	on(name, f) {
		const context = this.context;
		const handler = f.bind(context);
		const handlerSet = this.handlers[name] || (this.handlers[name] = []);
		handlerSet.push(handler);
		this.element.addEventListener(name, handler, false);
		return () => {
			this.element.removeEventListener(name, handler);
			const index = handlerSet.indexOf(handler);
			if (index >= 0) {
				handlerSet.splice(index, 1);
			}
		};
	}

	off() {
		const handlers = this.handlers;
		const element = this.element;
		for (let key of Object.keys(handlers)) {
			for (let handler of Array.from(handlers[key])) {
				element.removeEventListener(key, handler);
			}
		}
	}
}