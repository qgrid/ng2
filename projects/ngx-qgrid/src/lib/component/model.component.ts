import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModelBinder } from '@qgrid/core/infrastructure/model.bind';
import { noop } from '@qgrid/core/utility/kit';
import { GridRoot } from '../grid/grid-root';
import { GridModel } from '../grid/grid-model';
import { Disposable } from '../infrastructure/disposable';

export class ModelComponent implements OnChanges, OnInit {
	protected models: string[] = [];

	binder = new ModelBinder(this, this.disposable);
	commit = noop;

	constructor(
		public root: GridRoot,
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

	get model(): GridModel {
		return this.root.model;
	}
}
