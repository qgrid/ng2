import { SubSelectionState } from './selection.state';

export declare class MultipleSelectionState extends SubSelectionState {
  items: Map<any, any>;

  constructor();

  entries(): any[];
}
