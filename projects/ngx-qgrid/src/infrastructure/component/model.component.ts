import { ModelBinder } from 'ng2-qgrid/core/infrastructure/model.bind';
import { noop } from 'ng2-qgrid/core/utility/kit';
import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RootService } from './root.service';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Disposable } from '../disposable';

export class ModelComponent implements OnChanges, OnInit {
	protected models: string[] = [];

	binder = new ModelBinder(this, this.disposable);
	commit = noop;

	constructor(
		public root: RootService,
		private disposable: Disposable
	) {
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

	get model(): Model {
		return this.root.model;
	}
}
