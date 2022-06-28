import { Model } from '../model/model';

export declare class SelectionService {
  constructor(model: Model);

  lookup(items: any[], unit?: string): any[];
  map(entries: any[]): any[];
  hashFactory(): (entry: any) => any;
}
