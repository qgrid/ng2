import { Injectable, OnDestroy, SimpleChanges } from '@angular/core';
import { ModelBinder } from '@qgrid/core/infrastructure/model.bind';
import { DomTable } from '../dom/dom';
import { Disposable } from '../infrastructure/disposable';
import { GridRoot } from '../grid/grid-root';
import { GridView as NgxGridView } from '../grid/grid-view';
import { GridModel, GridEvent } from '../grid/grid-model';
import { ObservableLike } from '@qgrid/core/infrastructure/rx';
import { GridView } from '@qgrid/core/grid/grid.view';


@Injectable()
export class GridPlugin implements OnDestroy {
	readonly disposable = new Disposable();

	readonly observe = <TState>(event: GridEvent<TState>) => {
		return new ObservableLike(event, false, this.disposable);
	}

	readonly observeReply = <TState>(event: GridEvent<TState>) => {
		return new ObservableLike(event, true, this.disposable);
	}

	constructor(
		private $view: NgxGridView,
		private $root: GridRoot,
	) { }

	get model(): GridModel {
		const { model } = this.$root;
		return model;
	}

	get table(): DomTable {
		const { table } = this.$root;
		return table;
	}

	get view(): GridView {
		return this.$view;
	}

	keep(changes: SimpleChanges, states: string[]): void {
		const host = {};
		for (const key in changes) {
			if (changes.hasOwnProperty(key)) {
				const change = changes[key];
				host[key] = change.currentValue;
			}
		}

		const binder = new ModelBinder(host, this.disposable);
		const commit = binder.bound(this.model, states, false, false);
		commit();
	}

	ngOnDestroy() {
		this.disposable.finalize();
	}
}
