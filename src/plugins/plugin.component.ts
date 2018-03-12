import {
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Optional,
	SimpleChanges
} from '@angular/core';
import { ModelBinder } from 'ng2-qgrid/core/infrastructure/model.bind';
import { noop } from 'ng2-qgrid/core/utility';
import { Guard } from 'ng2-qgrid/core/infrastructure';
import { NgComponent } from '../infrastructure/component/ng.component';
import { RootService } from '../infrastructure/component/root.service';
import { GridComponent } from 'ng2-qgrid/main/grid/grid.component';

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

	setup() {
		return this.binder.bind(this.model, this.models, false);
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
		this.binder.bind(null);
	}

	get model() {
		const model = this.gridModel || (this.root && this.root.model);
		Guard.notNull('model', model);
		return model;
	}
}
