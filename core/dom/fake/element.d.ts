import {FakeClassList} from './class.list';

export interface IRect{
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}

export declare class FakeElement {
  constructor();
  classList: FakeClassList;
  getBoundingClientRect(): IRect;
  readonly clientWidth: number;
  readonly clientHeight: number;
}
