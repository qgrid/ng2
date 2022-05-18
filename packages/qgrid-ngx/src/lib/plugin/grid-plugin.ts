import { Injectable, OnDestroy } from '@angular/core';
import {
  Event,
  GridLet,
  Lazy,
  ObservableEvent, ObservableReplyEvent
} from '@qgrid/core';
import { DomTable } from '../dom/dom';
import { Grid, GridService } from '../grid/grid';
import { GridLet as NgxGridLet } from '../grid/grid-let';
import { GridModel } from '../grid/grid-model';
import { GridRoot } from '../grid/grid-root';
import { GridPlugin as GridPluginInterface } from '@qgrid/core';
import { Disposable } from '../infrastructure/disposable';

@Injectable()
export class GridPlugin implements OnDestroy, GridPluginInterface {
  private serviceLazy = new Lazy(() => this.qgrid.service(this.$root.model));

  readonly disposable = new Disposable();

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

  constructor(
		private $view: NgxGridLet,
		private $root: GridRoot,
		private qgrid: Grid,
  ) {
  }

  readonly observe = <TState>(event: Event<TState>): ObservableEvent<TState> => new ObservableEvent(event, this.disposable);

  readonly observeReply = <TState>(event: Event<TState>): ObservableReplyEvent<TState> => new ObservableReplyEvent(event, this.disposable);

  ngOnDestroy() {
    this.disposable.finalize();
  }
}
