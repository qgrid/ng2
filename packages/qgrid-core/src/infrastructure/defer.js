import { Event } from '../event/event';

class DeferPromise {
	constructor() {
		this.catchEvent = new Event();
		this.thenEvent = new Event();
	}

	reject() {
		this.catchEvent.emit();
		return this;
	}

	resolve(value) {
		this.thenEvent.emit(value);
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

export class Defer {
	constructor() {
		this.promise = new DeferPromise();
	}

	reject() {
		this.promise.reject();
	}

	resolve(value) {
		this.promise.resolve(value);
	}
}
