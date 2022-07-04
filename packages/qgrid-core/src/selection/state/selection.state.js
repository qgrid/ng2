import { Node } from '../../node/node';
import { isArray } from '../../utility/kit';

export class SubSelectionState {
  constructor(model, service) {
    this.model = model;
    this.service = service;
  }

  select(item, state = true, key, source) {
    key = key || this.keyFactory();
    if (isArray(item)) {
      item.forEach(x => this.select(x, state, key, source));
      return;
    }

    if (item instanceof Node) {
      const { rows } = this.model.data();
      if (rows.length) {
        item.rows.forEach(index => this.select(rows[index], state, key, source));
        return;
      }
    }

    this.selectCore(item, state, key);
  }

  canSelect(item) {
    return this.canSelectCore(item);
  }

  toggle(item) {
    const state = this.state(item);
    return this.select(item, state === null || !state);
  }

  state(item, key) {
    key = key || this.keyFactory();
    if (isArray(item)) {
      const all = item.every(x => this.state(x, key));
      return all ? true : item.some(x => this.state(x, key)) ? null : false;
    }

    if (item instanceof Node) {
      const { rows } = this.model.data();
      if (rows.length) {
        const all = item.rows.length && item.rows.every(index => this.state(rows[index], key));
        return all ? true : item.rows.some(index => this.state(rows[index], key)) ? null : false;
      }
    }

    return this.stateCore(item, key);
  }

  stateAll(items) {
    if (!items.length) {
      return false;
    }

    const key = this.keyFactory();

    const notSelected = items.findIndex(x => this.state(x, key) === false);
    if (notSelected < 0) {
      return true;
    }

    return notSelected === 0
      ? items.every(x => this.state(x, key) === false)
        ? false
        : null
      : null;
  }

  keyFactory() {
    return this.service.hashFactory();
  }

  clear() {
    this.clearCore();
  }

  entries() {
    return [];
  }

  selectCore() {
  }

  clearCore() {
  }

  stateCore() {
    return false;
  }

  canSelectCore() {
    return true;
  }
}
