import { ModelBinder } from '@qgrid/core/infrastructure/model.bind';
import { Event } from '@qgrid/core/infrastructure/event';
import { GridModel } from '../grid/grid-model';
import { OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { GridModelBuilder } from '../grid/grid-model.builder';
import { Disposable } from '../infrastructure/disposable';

export class RootComponent implements OnChanges, OnInit {
	model: GridModel = null;
	modelChanged = new Event();

	protected models: string[] = [];

	private binder = new ModelBinder(this, this.rootDisposable);
	private commit: () => void;

	constructor(
		private modelBuilder: GridModelBuilder,
		private rootDisposable: Disposable
		) {
	}

	ngOnInit() {
		if (!this.commit) {
			this.commit = this.setup();
		}
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

	private setup() {
		let run = true;
		if (!this.model) {
			this.model = this.modelBuilder.build();
			this.modelChanged.emit(this.model);
			run = false;
		}

		return this.binder.bound(this.model, this.models, run);
	}
}
