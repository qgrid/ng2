import {OnInit, OnDestroy} from '@angular/core';
import {DisposableView} from 'ng2-qgrid/core/view/disposable.view';

export abstract class NgComponent extends DisposableView implements OnInit, OnDestroy {
	constructor() {
		super();
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.dispose();
	}
}
