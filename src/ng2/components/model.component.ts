import ModelBinder from 'core/infrastructure/model.bind';
import {noop} from 'core/services/utility';
import {OnChanges, SimpleChanges} from '@angular/core';
import {Component} from './component';
import {RootService} from "./root.service";

export class ModelComponent extends Component implements OnChanges {
  protected names: string[] = [];
  binder = new ModelBinder(this);
  commit = noop;

  constructor(public root: RootService) {
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
    return this.root.model;
  }
}
