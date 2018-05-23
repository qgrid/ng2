import { OnInit, OnDestroy } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { DisposableView } from 'ng2-qgrid/core/view/disposable.view';

export abstract class NgComponent implements OnDestroy {
	private disposes: Array<() => void> = [];

	constructor() {
	}

	using<T extends DisposableView>(instance: T | (() => void)): T | null {
		if (instance instanceof DisposableView) {
			this.disposes.push(() => instance.dispose());
			return instance;
		}

		this.disposes.push(instance);
		return null;
	}

	ngOnDestroy() {
		const temp = this.disposes;
		this.disposes = [];
		for (let dispose of temp) {
			dispose();
		}
	}
}
