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
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { ModelProxy } from 'ng2-qgrid/core/infrastructure/model.proxy';
import { NgComponent } from '../infrastructure/component/ng.component';
import { RootService } from '../infrastructure/component/root.service';
import { GridComponent } from '../main/grid/grid.component';

export class PluginComponent extends NgComponent implements OnInit, OnChanges, OnDestroy {
	private binder = new ModelBinder(this);
	private commit = noop;
	private modelProxy: ModelProxy = null;
	protected models: string[] = [];

	context: any = { $implicit: this };

	@Input('model') private gridModel: any = null;

	constructor(@Optional() protected root: RootService) {
		super();
	}

	ngOnInit() {
		this.commit = this.setup();
		this.commit();

		this.onReady();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.commit();
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.binder.dispose();
		if (this.modelProxy) {
			this.modelProxy.dispose();
			this.modelProxy = null;
		}
	}

	onReady() {
	}

	isReady() {
		return !!this.findModel();
	}

	get model(): Model {
		const model = this.findModel();
		Guard.notNull(model, 'model');

		if (!this.modelProxy) {
			this.modelProxy = new ModelProxy(model);
			return this.modelProxy.subject;
		}

		if (model !== this.modelProxy.target) {
			this.modelProxy.dispose();
			this.modelProxy = new ModelProxy(model);
			return this.modelProxy.subject;
		}

		return this.modelProxy.subject;
	}

	private setup() {
		return this.binder.bound(this.model, this.models, false);
	}

	private findModel(): Model {
		return this.gridModel || (this.root && this.root.model);
	}
}
