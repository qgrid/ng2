import {
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Optional,
	SimpleChanges
} from '@angular/core';
import { ModelBinder } from 'ng2-qgrid/core/infrastructure/model.bind';
import { noop } from 'ng2-qgrid/core/utility/kit';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { NgComponent } from '../infrastructure/component/ng.component';
import { RootService } from '../infrastructure/component/root.service';
import { GridComponent } from '../main/grid/grid.component';

export class PluginComponent extends NgComponent
	implements OnInit, OnChanges, OnDestroy {
	@Input('model') private gridModel: any = null;

	public context: any = { $implicit: this };
	private binder = new ModelBinder(this);
	private commit = noop;
	protected models: string[] = [];

	constructor(@Optional() protected root: RootService) {
		super();
	}

	ngOnInit() {
		this.commit = this.setup();
		this.commit();

		this.onReady();
	}

	onReady() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.commit();
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.binder.dispose();
	}

	isReady() {
		return !!(this.gridModel || (this.root && this.root.model));
	}

	get model() {
		const model = this.gridModel || (this.root && this.root.model);
		Guard.notNull('model', model);
		return model;
	}

	private setup() {
		return this.binder.bound(this.model, this.models, false);
	}
}
