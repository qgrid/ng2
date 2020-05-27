import { isFunction } from '../utility/kit';
import { Guard } from './guard';
import { GridError } from './error';

export class Disposable {
	constructor() {
		this.disposes = [];
	}

	add(resource) {
		Guard.notNull(resource, 'resource');

		const test = resource;
		if (isFunction(test.finalize)) {
			this.disposes.push(() => test.finalize());
			return;
		}

		if (isFunction(test.unsubscribe)) {
			this.disposes.push(() => test.unsubscribe());
			return;
		}

		if (isFunction(test)) {
			this.disposes.push(test);
			return;
		}

		throw new GridError(
			'disposable',
			`Resource is not a disposable`
		);
	}

	remove(resource) {
		const index = this.disposes.indexOf(resource);
		if (index >= 0) {
			this.disposes.splice(index, 1);
			return true;
		}

		return false;
	}

	finalize() {
		const disposes = this.disposes;
		this.disposes = [];

		for (const dispose of disposes) {
			dispose();
		}
	}
}
