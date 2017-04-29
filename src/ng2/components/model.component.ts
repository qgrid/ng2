import ModelBinder from 'core/infrastructure/model.bind';
import {noop} from 'core/services/utility';
import * as guard from 'core/infrastructure/guard';
import {OnChanges, SimpleChanges} from '@angular/core';
import Component from './component';
import RootComponent from './root.component';

export default class ModelComponent extends Component implements OnChanges {
  private binder = new ModelBinder(this);
  private commit = noop;
  private names: string[] = [];
  root: RootComponent = null;

  constructor(...names: string[]) {
    super();

    this.names = names;
  }

  setup() {
    this.binder.bind(this.model, this.names, false);
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
