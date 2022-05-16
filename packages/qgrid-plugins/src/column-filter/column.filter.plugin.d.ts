import {
  ColumnModel,
  Command,
  Event,
  Expression,
  GridPlugin,
} from '@qgrid/core';

export declare class ColumnFilterPlugin {
  by: Set<string>;
  expression: Expression;

  cancelEvent: Event;
  submitEvent: Event;

  getValue: (row: any) => any;

  column: ColumnModel;
  value: any;
  items: Array<any>;

  changeOperator: Command;
  reset: Command;
  commit: Command;
  cancel: Command;

  hasBlanks: boolean;

  constructor(plugin: GridPlugin, context: { column: ColumnModel });

  isEmpty(): boolean;
}
