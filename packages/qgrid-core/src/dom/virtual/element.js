import { FakeClassList } from '../fake/class.list';

export class VirtualElement {
  get clientWidth() {
    return this.getRect().width;
  }

  get clientHeight() {
    return this.getRect().height;
  }

  get offsetWidth() {
    return this.getRect().width;
  }

  get offsetHeight() {
    return this.getRect().height;
  }

  constructor(getRect) {
    this.classList = new FakeClassList();
    this.getRect = getRect;
  }

  getBoundingClientRect() {
    return this.getRect();
  }
}
