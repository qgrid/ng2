import { Injectable, OnDestroy, SimpleChanges } from '@angular/core';
import { ModelBinder } from '@qgrid/core/model/model.bind';
import { DomTable } from '../dom/dom';
import { Disposable } from '../infrastructure/disposable';
import { GridRoot } from '../grid/grid-root';
import { GridLet as NgxGridLet } from '../grid/grid-let';
import { GridModel } from '../grid/grid-model';
import { ObservableLike } from '@qgrid/core/infrastructure/rx';
import { GridLet } from '@qgrid/core/grid/grid.let';
import { Event } from '@qgrid/core/event/event';

@Injectable()
export class GridPlugin implements OnDestroy {
	readonly disposable = new Disposable();

	readonly observe = <TState>(event: Event<TState>) => {
		return new ObservableLike(event, false, this.disposable);
	}

	readonly observeReply = <TState>(event: Event<TState>) => {
		return new ObservableLike(event, true, this.disposable);
	}

	constructor(
		private $view: NgxGridLet,
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

	get view(): GridLet {
		return this.$view;
	}

	stateAccessor<TState>(type: new() => TState): (state: Partial<TState>) => void {
		return null;
	}

	keep(changes: SimpleChanges, states: string[]): void {
		const host = {};
		for (const key in changes) {
			if (changes.hasOwnProperty(key)) {
				const change = changes[key];
				host[key] = change.currentValue;
			}
		}

		const binder = new ModelBinder(host, this);
		const commit = binder.bound(states, false, false);
		commit();
	}

	ngOnDestroy() {
		this.disposable.finalize();
	}
}
