import ModelBinder from 'core/infrastructure/model.bind';
import {noop} from 'core/services/utility';
import * as guard from 'core/infrastructure/guard';
import {OnChanges, SimpleChanges, Inject, forwardRef} from '@angular/core';
import {Component} from './component';
import {RootComponent} from './root.component';

export class ModelComponent extends Component implements OnChanges {
  protected names: string[] = [];
  binder = new ModelBinder(this);
  commit = noop;

  constructor(public root: RootComponent) {
    super();
  }

  setup() {
    return this.binder.bind(this.model, this.names, false);
  }

  ngOnInit() {
    this.commit = this.setup();
    this.commit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.commit();
  }

  ngOnDestroy() {
    this.binder.bind(null);
  }

  get model() {
    guard.notNull(this.root, 'root');
    return this.root.model;
  }
}
