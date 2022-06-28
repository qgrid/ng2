import { Model } from '../../model/model';
import { SelectionService } from '../selection.service';

export declare class SubSelectionState {
  constructor(model: Model, service: SelectionService);

  select(item: any | any[], state: boolean, key: string): void;
  canSelect(item: any | any[], state: boolean, key: string): void;
  toggle(item: any | any[]): ReturnType<SubSelectionState['select']>;
  state(item: any | any[], key: string): boolean;
  hashFactory(): (entry: any) => any;
  clear(): void;
}
