import { OnInit, OnDestroy } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { Disposable } from 'ng2-qgrid/core/infrastructure/disposable';

export abstract class NgComponent implements OnDestroy {
	private basket = new Disposable();

	constructor() {
	}

	using<T extends Disposable>(instance: T | (() => void)): T {
		return this.basket.using(instance) as T;
	}

	ngOnDestroy() {
		this.basket.dispose();
	}
}
