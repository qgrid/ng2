export class EventManager {
	constructor(context, apply = f => f()) {
		this.context = context;
		this.apply = apply;
	}

	bind(f) {
		const handler = f.bind(this.context);
		const apply = this.apply;
		return (...args) => apply(() => handler(...args));
	}
}