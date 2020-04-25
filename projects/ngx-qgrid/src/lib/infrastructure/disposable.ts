import { Injectable, OnDestroy } from '@angular/core';
import { isFunction } from '@qgrid/core/utility/kit';
import { Guard } from '@qgrid/core/infrastructure/guard';
import { GridError } from './error';
import { DisposableResource } from '@qgrid/core/infrastructure/disposable';

@Injectable()
export class Disposable implements OnDestroy {
	private disposes = [];

	add(resource: DisposableResource): void {
		Guard.notNull(resource, 'resource');

		const test = resource as any;
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

	remove(resource: Disposable) {
		const index = this.disposes.indexOf(resource);
		if (index >= 0) {
			this.disposes.splice(index, 1);
			return true;
		}

		return false;
	}

	finalize() {
		const temp = this.disposes;
		this.disposes = [];

		for (const dispose of temp) {
			dispose();
		}
	}

	ngOnDestroy() {
		this.finalize();
	}
}
