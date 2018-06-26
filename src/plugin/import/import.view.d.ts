import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Command } from 'ng2-qgrid/core/command/command';

export declare class ImportView {
	constructor(model: Model, context: { element: any, options: any });

	model: { [ key: string ]: any };
	options: any;
	upload: Command;

	load(e: Event): void;
}
