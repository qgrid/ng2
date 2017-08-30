import {IContext} from '../box';

export declare class StyleBox {
  constructor(context: IContext);
  context: IContext;
  entries: Map<any, any>;
  addClass(item: string, name: string): void;
  removeClass(item: string, name: string): boolean;
  key(item: string): string;
}
