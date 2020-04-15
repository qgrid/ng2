import { Injectable, OnDestroy, SimpleChanges } from '@angular/core';
import { Guard } from '@qgrid/core/infrastructure/guard';
import { ModelProxy } from '@qgrid/core/infrastructure/model.proxy';
import { ModelBinder } from '@qgrid/core/infrastructure/model.bind';
import { Disposable } from '../infrastructure/disposable';
import { GridRoot } from '../grid/grid-root';
import { GridView } from '../grid/grid-view';
import { Model } from '@qgrid/core/infrastructure/model';
import { Table } from '@qgrid/core/dom/table';


@Injectable()
export class GridPlugin implements OnDestroy {
	private modelProxy: ModelProxy = null;
	private disposable = new Disposable();

	constructor(
		private root: GridRoot,
		public view: GridView
	) { }

	get model(): Model {
		const { model } = this.root;
		if (!this.modelProxy) {
			Guard.notNull(model, 'model');

			this.modelProxy = new ModelProxy(model, this.disposable);
			return this.modelProxy.subject;
		}

		if (model !== this.modelProxy.target) {
			this.disposable.finalize();
			Guard.notNull(model, 'model');

			this.modelProxy = new ModelProxy(model, this.disposable);
			return this.modelProxy.subject;
		}

		return this.modelProxy.subject;
	}

	get table(): Table {
		const { table } = this.root;
		Guard.notNull(table, 'table');

		return table;
	}

	keep(changes: SimpleChanges, models: string[]) {
		const host = {};
		for (const key in changes) {
			if (changes.hasOwnProperty(key)) {
				const change = changes[key];
				host[key] = change.currentValue;
			}
		}

		const binder = new ModelBinder(host, this.disposable);
		const commit = binder.bound(this.model, models, false, false);
		commit();
	}

	ngOnDestroy() {
		this.disposable.finalize();
	}
}
