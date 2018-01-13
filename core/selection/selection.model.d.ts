import { Resource } from '../resource/resource';
import { IIdentityResult } from '../utility/utility';
import { SelectionUnit } from './selection.unit';
import { SelectionMode } from './selection.mode';

export interface IKey {
  row: IIdentityResult;
  column: IIdentityResult;
}

/**
 * A class that allows to control selection function of the q-grid.
 */
export declare class SelectionModel {
  constructor();

  resource: Resource;

  /**
   * Controls if click on the q-grid body should select row or not.
   * 
   * * `'body'` click on the q-grid body leads to row select/unselect.
   * * `'custom'` only select checkbox click leads to row select/unselect.
   */
  area: string;

  /**
   * Selection primitive.
   * 
   * * `'row'` user can select rows by clicking on checkboxes or q-grid body area.
   * * `'cell'` `default` user can select cells clicking on the q-grid body area.
   * * `'column'` user can select columns by clicking on the q-grid body area. 
   * * `'mix'` user can select both rows and cells, rows are selectable by clicking on row-indicator column.
   */
  unit: SelectionUnit;

  /**
   * Selection mode.
   * 
   * * `'single'`
   * * `'multiple'`
   * * `'range'`
   */
  mode: SelectionMode;

  /**
   * List of selected items.
   */
  items: any[];

  /**
   * Set of map function, that can convert column and row to nessesary format.
   * 
   * * `'column'` custom column key will be stored in the items property.
   * * `'row'` custom row id will be stored in the items property.
   */
  key: IKey;
}
