import { Command, Model } from '@qgrid/core';

export declare class ExportPlugin {
	constructor(model: Model,  type: string );
	
	readonly type: string;
	readonly csv: Command;
	readonly json: Command;
	readonly pdf: Command;
	readonly xlsx: Command;
	readonly xml: Command;
}
