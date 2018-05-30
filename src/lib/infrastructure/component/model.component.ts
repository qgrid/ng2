import { ModelBinder } from 'ng2-qgrid/core/infrastructure/model.bind';
import { noop } from 'ng2-qgrid/core/utility/kit';
import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgComponent } from './ng.component';
import { RootService } from './root.service';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

export class ModelComponent extends NgComponent implements OnChanges, OnInit, OnDestroy {
	public binder = new ModelBinder(this);
	public commit = noop;
	protected models: string[] = [];

	constructor(public root: RootService) {
		super();
	}

	setup() {
		return this.binder.bound(this.model, this.models, false);
	}

	ngOnInit() {
		this.commit = this.setup();
		this.commit();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.commit();
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.binder.dispose();
	}

	get model(): Model {
		return this.root.model;
	}
}
