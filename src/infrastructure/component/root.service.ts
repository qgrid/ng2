import {Guard} from '@grid/core/infrastructure';
import {Injectable} from '@angular/core';
import {CommandManager} from '@grid/infrastructure/command';
import {Model} from '@grid/core/infrastructure/model';
import {Table} from '@grid/core/dom/table';

@Injectable()
export class RootService {
  private gridModel: Model = null;
  public markup: any = {};
  public bag = new Map<HTMLElement, any>();
  public table: Table = null;
  public commandManager;

  constructor() {
    this.markup.document = document;
  }

  get model() {
    Guard.notNull(this.gridModel, 'model');

    return this.gridModel;
  }

  set model(value) {
    this.gridModel = value;
  }
}
