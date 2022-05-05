import { Command, Model } from '@qgrid/core';

export declare class ExportPlugin {
  readonly type: string;
  readonly csv: Command;
  readonly json: Command;
  readonly pdf: Command;
  readonly xlsx: Command;
  readonly xml: Command;

  constructor(model: Model,  type: string );
}
