import { Model, ModelBinder, Event } from 'ng2-qgrid/core/infrastructure';
import { noop } from 'ng2-qgrid/core/utility';
import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgComponent } from './ng.component';

export class RootComponent extends NgComponent implements OnInit, OnChanges, OnDestroy {
	public model = null;
	public modelChanged = new Event();
	protected models: string[] = [];
	private binder = new ModelBinder(this);
	private commit;

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
		this.binder.bind(null);
	}

	private setup() {
		let run = true;
		if (!this.model) {
			this.model = new Model();
			this.modelChanged.emit(this.model);
			run = false;
		}

		return this.binder.bind(this.model, this.models, run);
	}
}
