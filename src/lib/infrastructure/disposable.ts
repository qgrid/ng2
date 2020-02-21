import { Injectable, OnDestroy } from '@angular/core';
import { Disposable as DisposableCore } from 'ng2-qgrid/core/infrastructure/disposable';

@Injectable()
export class Disposable implements OnDestroy {
	private disposable: DisposableCore;

	constructor() {
		this.disposable = new DisposableCore();
	}

	add(instance: () => void) {
		return this.disposable.using(instance);
	}

	finalize() {
		this.disposable.dispose();
	}

	ngOnDestroy() {
		this.finalize();
	}
}
