import { GridError } from '../infrastructure/error';

export class Tr {

  get model() {
    if (!Tr.equals(this, this.tr)) {
      throw new GridError('tr', 'Internal model doesn\'t match container');
    }

    return this.tr.model;
  }

  get element() {
    if (!Tr.equals(this, this.tr)) {
      throw new GridError('tr', 'Internal model doesn\'t match container');
    }

    return this.tr.element;
  }

  constructor(tr) {
    this.tr = tr;

    // We need to cache it due to possible virtual mode;
    this.index = tr.index;
  }

  static equals(x, y) {
    if (x === y) {
      return true;
    }

    if (!x || !y) {
      return false;
    }

    return x.index === y.index;
  }
}
