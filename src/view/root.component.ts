import {Model, ModelBinder, Event} from '@grid/core/infrastructure';
import {noop} from '@grid/core/services/utility';
import {OnChanges, SimpleChanges} from '@angular/core';
import {Component} from './component';

export class RootComponent extends Component implements OnChanges {
  public model = null;
  public modelChanged = new Event();
  protected models: string[] = [];
  private binder = new ModelBinder(this);
  private commit = noop;

  constructor() {
    super();
  }

  ngOnInit() {
    this.commit = this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('model')) {
      this.modelChanged.emit(this.model);
      this.commit = this.setup();
      this.commit();
      return;
    }

    this.commit();
  }

  ngOnDestroy() {
    this.binder.bind(null);
  }

  private setup() {
    let run = true;
    if (!this.model) {
      this.model = new Model();
      this.modelChanged.emit(this.model);
      run = false;
    }

    return this.binder.bind(this.model, this.models, run);
  }
}
