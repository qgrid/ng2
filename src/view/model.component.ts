import {ModelBinder} from '@grid/core/infrastructure';
import {noop} from '@grid/core/services/utility';
import {OnChanges, Optional, SimpleChanges} from '@angular/core';
import {Component} from './component';
import {RootService} from './root.service';

export class ModelComponent extends Component implements OnChanges {
  public binder = new ModelBinder(this);
  public commit = noop;
  protected models: string[] = [];

  constructor(public root: RootService) {
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
    this.binder.bind(null);
  }

  get model() {
    return this.root.model;
  }
}
