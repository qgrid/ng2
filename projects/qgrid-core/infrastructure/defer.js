import { Event } from '../event/event';

export class Defer {
	constructor() {
		this.promise = new DeferPromise();
	}

	reject() {
		this.promise.reject();
	}

	resolve() {
		this.promise.resolve();
	}
}

class DeferPromise {
	constructor() {
		this.catchEvent = new Event();
		this.thenEvent = new Event();
	}

	reject() {
		this.catchEvent.emit();
		return this;
	}

	resolve() {
		this.thenEvent.emit();
		return this;
	}

	catch(handler) {
		this.catchEvent.on(handler);
		return this;
	}

	then(handler) {
		this.thenEvent.on(handler);
		return this;
	}
}