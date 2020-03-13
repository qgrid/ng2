import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class Disposable implements OnDestroy {
	private disposes = [];

	add<T extends { finalize: () => void }>(instance: T | (() => void)): T | (() => void) {
		if (instance) {
			if (instance.hasOwnProperty('finalize')) {
				this.disposes.push(() => (instance as any).finalize());
			} else {
				this.disposes.push(instance);
			}
		}
		return instance;
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