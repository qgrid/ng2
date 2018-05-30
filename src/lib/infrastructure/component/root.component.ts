import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { ModelBinder } from 'ng2-qgrid/core/infrastructure/model.bind';
import { Event } from 'ng2-qgrid/core/infrastructure/event';
import { noop } from 'ng2-qgrid/core/utility/kit';
import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgComponent } from './ng.component';

export class RootComponent extends NgComponent implements OnChanges, OnDestroy {
	public model: Model = null;
	public modelChanged = new Event();
	protected models: string[] = [];
	private binder = new ModelBinder(this);
	private commit: () => void;

	constructor() {
		super();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.hasOwnProperty('model')) {
			this.modelChanged.emit(this.model);
			this.commit = this.setup();
			this.commit();
			return;
		}

		if (!this.commit) {
			this.commit = this.setup();
		}

		this.commit();
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.binder.dispose();
	}

	private setup() {
		let run = true;
		if (!this.model) {
			this.model = new Model();
			this.modelChanged.emit(this.model);
			run = false;
		}

		return this.binder.bound(this.model, this.models, run);
	}
}
