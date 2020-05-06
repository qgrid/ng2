import { Model } from '@qgrid/core/model/model';
import { Command } from '@qgrid/core/command/command';

export declare interface ImportOptions {
	head: 'alpha' | 'numeric' | 'default';
}
export declare class ImportPlugin {
	constructor(model: Model, element: HTMLElement, options?: ImportOptions);

	load(e: any): void;
	upload(): void;
}
