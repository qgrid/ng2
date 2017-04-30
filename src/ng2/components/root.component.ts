import Model from 'core/infrastructure/model';
import ModelBinder from 'core/infrastructure/model.bind';
import {noop} from 'core/services/utility';
import Event from 'core/infrastructure/event';
import {OnChanges, SimpleChanges} from '@angular/core';
import {Component} from './component';

export class RootComponent extends Component implements OnChanges {
  public model = null;
  public modelChanged = new Event();
  protected names: string[] = [];
  binder = new ModelBinder(this);
  commit = noop;

  constructor() {
    super();
  }

  setup() {
    let run = true;
    if (!this.model) {
      this.model = new Model();
      run = false;
    }

    return this.binder.bind(this.model, this.names, run);
  }

  ngOnInit() {
    this.commit = this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('model')) {
      this.commit = this.setup();
      this.commit();

      this.modelChanged.emit(this.model);
      return;
    }

    this.commit();
  }

  ngOnDestroy() {
    this.binder.bind(null);
  }
}
