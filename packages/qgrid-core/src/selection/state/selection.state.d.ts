import { Model } from '../../model/model';
import { SelectionService } from '../selection.service';

export declare class SubSelectionState {
  constructor(model: Model, service: SelectionService);

  select(item: any | any[], state: boolean, key: (entry: any) => any, source: string): void;
  canSelect(item: any | any[], state: boolean, key: (entry: any) => any, source: string): void;
  toggle(item: any | any[]): void;
  state(item: any | any[], key: (entry: any) => any): boolean;
  hashFactory(): (entry: any) => any;
  clear(): void;
}
