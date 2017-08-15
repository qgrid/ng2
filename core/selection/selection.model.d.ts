import {Resource} from '../resource/resource';
import {IIdentityResult} from '../utility/utility';

export declare type UnitType = 'row' | 'cell' | 'column' | 'mix';
export declare type ModeType = 'single' | 'mutiple' | 'range';

export interface IKey {
  row: IIdentityResult;
  column: IIdentityResult;
}

export declare class SelectionModel {
  constructor();

  area: string;
  resource: Resource;
  unit: UnitType;
  mode: ModeType;
  items: any[];
  key: IKey;
}
