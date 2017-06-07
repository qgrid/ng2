import {ModelBinder} from '@grid/core/infrastructure';
import {noop} from '@grid/core/utility';
import {OnChanges, SimpleChanges} from '@angular/core';
import {NgComponent} from './ng.component';
import {RootService} from './root.service';

export class ModelComponent extends NgComponent implements OnChanges {
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
