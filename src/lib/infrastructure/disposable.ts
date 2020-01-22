import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class Disposable implements OnDestroy {
	private disposes = [];

	add(instance: () => void) {
		this.disposes.push(instance);
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
