import { Injectable, OnDestroy } from '@angular/core';
import { Disposable as DisposableCore } from '@qgrid/core/infrastructure/disposable';

@Injectable()
export class Disposable extends DisposableCore implements OnDestroy {
	ngOnDestroy() {
		this.finalize();
	}
}
