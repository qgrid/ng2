import {AppError} from '@grid/core/infrastructure';
import {Element, ElementCore} from './element';

export class CellCore extends ElementCore {
  constructor() {
    super();
  }
}

const empty = new CellCore();

export class Cell extends Element {
  constructor(element: HTMLTableCellElement) {
    super(element);
  }

  static get empty() {
    return empty;
  }

  get model() {
    // const ctrl = angular.element(this.element).controller(TD_CORE_NAME);
    // if (!ctrl) {
    throw new AppError('cell', 'Controller for cell is not found')
    // }
    //
    // return ctrl;
  }
}

