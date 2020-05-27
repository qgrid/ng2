export class EventListener {
	constructor(element, manager) {
		this.element = element;
		this.manager = manager;
		this.handlers = {};
	}

	on(name, f, settings = false) {
		const manager = this.manager;
		const handler = manager.bind(f);
		const handlerSet = this.handlers[name] || (this.handlers[name] = []);
		handlerSet.push(handler);

		this.element.addEventListener(name, handler, settings);
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