import { Model } from '@qgrid/core/model/model';
import { Command } from '@qgrid/core/command/command';

export declare class ExportPlugin {
	constructor(model: Model,  type: string );
	
	readonly type: string;
	readonly csv: Command;
	readonly json: Command;
	readonly pdf: Command;
	readonly xlsx: Command;
	readonly xml: Command;
}
