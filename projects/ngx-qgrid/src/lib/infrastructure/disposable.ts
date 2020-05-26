import { Injectable, OnDestroy } from '@angular/core';
import { Disposable as DisposableCore, DisposableResource } from '@qgrid/core/infrastructure/disposable';

@Injectable()
export class Disposable implements OnDestroy {
	private disposable = new DisposableCore();

	add(resource: DisposableResource) {
		this.disposable.add(resource);
	}

	remove(resource: DisposableResource): boolean {
		return this.disposable.remove(resource);
	}

	finalize() {
		this.disposable.finalize();
	}

	ngOnDestroy() {
		this.finalize();
	}
}
