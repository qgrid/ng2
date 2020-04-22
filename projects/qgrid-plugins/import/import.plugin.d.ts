import { Model } from '@qgrid/core/infrastructure/model';
import { Command } from '@qgrid/core/command/command';

export declare interface ImportOptions {
	head?: 'alpha' | 'numeric' | 'default';
}

export declare class ImportPlugin {
	constructor(model: Model, context: { element: HTMLElement, options?: ImportOptions });

	model: { [ key: string ]: any };
	options?: ImportOptions;
	upload: Command;

	load(e: any): void;
}
