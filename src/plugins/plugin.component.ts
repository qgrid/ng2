import {ModelBinder} from '@grid/core/infrastructure';
import {noop} from '@grid/core/utility';
import {Input, OnChanges, Optional, SimpleChanges} from '@angular/core';
import {NgComponent, RootService} from '../infrastructure/component';
import {Guard} from '@grid/core/infrastructure';

export class PluginComponent extends NgComponent implements OnChanges {
  @Input('model') public gridModel: any = null;

  public context = {$implicit: this};
  private binder = new ModelBinder(this);
  private commit = noop;
  protected models: string[] = [];

  constructor(@Optional() public root: RootService) {
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
    const model = this.gridModel || (this.root && this.root.model);
    Guard.notNull('model', model);
    return model;
  }
}
