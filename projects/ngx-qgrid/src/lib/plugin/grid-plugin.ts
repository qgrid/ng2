import { Injectable, OnDestroy } from '@angular/core';
import { Disposable } from '../infrastructure/disposable';
import { DomTable } from '../dom/dom';
import { Event } from '@qgrid/core/event/event';
import { GridLet } from '@qgrid/core/grid/grid.let';
import { GridLet as NgxGridLet } from '../grid/grid-let';
import { GridModel } from '../grid/grid-model';
import { GridRoot } from '../grid/grid-root';
import { ObservableLike, ObservableEvent, ObservableReplyEvent } from '@qgrid/core/rx/rx';
import { Grid, GridService } from '../grid/grid';
import { Lazy } from '@qgrid/core/infrastructure/lazy';

@Injectable()
export class GridPlugin implements OnDestroy {
	private serviceLazy = new Lazy(() => this.qgrid.service(this.$root.model));

	readonly disposable = new Disposable();

	readonly observe = <TState>(event: Event<TState>): ObservableLike<TState> => {
		return new ObservableEvent(event, this.disposable);
	}

	readonly observeReply = <TState>(event: Event<TState>): ObservableLike<TState> => {
		return new ObservableReplyEvent(event, this.disposable);
	}

	constructor(
		private $view: NgxGridLet,
		private $root: GridRoot,
		private qgrid: Grid
	) {
	}

	get model(): GridModel {
		const { model } = this.$root;
		return model;
	}

	get view(): GridLet {
		return this.$view;
	}

	get table(): DomTable {
		const { table } = this.$root;
		return table;
	}

	get service(): GridService {
		return this.serviceLazy.instance;
	}

	ngOnDestroy() {
		this.disposable.finalize();
	}
}
