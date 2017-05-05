import * as guard from 'core/infrastructure/guard';
import {Injectable} from '@angular/core';

@Injectable()
export class RootService {
  private gridModel: any = null;

  constructor() {
  }

  get model() {
    guard.notNull(this.gridModel, 'model');

    return this.gridModel;
  }

  set model(value) {
    this.gridModel = value
  }
}
