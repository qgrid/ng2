import {Guard} from '@grid/core/infrastructure';
import {Injectable} from '@angular/core';

@Injectable()
export class RootService {
  private gridModel: any = null;

  constructor() {
  }

  get model() {
    Guard.notNull(this.gridModel, 'model');

    return this.gridModel;
  }

  set model(value) {
    this.gridModel = value
  }
}
