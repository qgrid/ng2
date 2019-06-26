import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { ModelBinder } from 'ng2-qgrid/core/infrastructure/model.bind';
import { Event } from 'ng2-qgrid/core/infrastructure/event';
import { OnChanges, OnDestroy, SimpleChanges, OnInit } from '@angular/core';
import { NgComponent } from './ng.component';
import { ModelBuilderService } from '../../main/model/model-builder.service';

export class RootComponent extends NgComponent implements OnChanges, OnInit, OnDestroy {
	model: Model = null;
	modelChanged = new Event();

	protected models: string[] = [];

	private binder = new ModelBinder(this);
	private commit: () => void;

	constructor(private modelBuilder: ModelBuilderService) {
		super();
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

	ngOnDestroy() {
		super.ngOnDestroy();

		this.binder.dispose();
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
