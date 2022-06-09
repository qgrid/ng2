import { Row } from '../dom/row';
import { Column } from '../dom/column';
import { Cell } from '../dom/cell';
import { Model } from '../model/model';

export declare class SelectionService {
  constructor(model: Model);

  lookup(items: any[], unit?: string): any[];
  map(entries: any[]): any[];
  keyFactory<K>(unit: string): (item: 'column' | 'row' | 'cell' | 'mix') => K;
  hashFactory(): (key: string) => any;
}
