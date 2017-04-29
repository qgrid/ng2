import Model from 'core/infrastructure/model';
import ModelBinder from 'core/infrastructure/model.bind';
import {noop} from 'core/services/utility';
import Event from 'core/infrastructure/event';
import {OnChanges, SimpleChanges} from '@angular/core';
import Component from './component';

export default class RootComponent extends Component implements OnChanges {
  modelChanged = new Event();
  model = null;
  private binder = new ModelBinder(this);
  private commit = noop;
  private names: string[] = [];

  constructor(...names: string[]) {
    super();

    this.names = names;
  }

  setup() {
    let run = true;
    if (!this.model) {
      this.model = new Model();
      run = false;
    }

    return this.binder.bind(this.model, this.names, run);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('model')) {
      this.commit = this.setup();
      this.commit();

      this.modelChanged.emit(this.model);
      this.ngOnInit();
      return;
    }

    this.commit();
  }

  ngOnDestroy() {
    this.binder.bind(null);
  }
}
