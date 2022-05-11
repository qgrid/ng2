import { Rect } from '../rect';
import { FakeClassList } from './class.list';

export declare class FakeElement {
  classList: FakeClassList;

  readonly clientWidth: number;
  readonly clientHeight: number;
  readonly offsetWidth: number;
  readonly offsetHeight: number;

  constructor();


  getBoundingClientRect(): Rect;
}
