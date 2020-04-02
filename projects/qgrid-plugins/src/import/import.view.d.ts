import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Command } from 'ng2-qgrid/core/command/command';
import { FileChangeEvent } from '@angular/compiler-cli/src/perform_watch';

export declare interface ImportOptions {
	head?: 'alpha' | 'numeric' | 'default';
}

export declare class ImportView {
	constructor(model: Model, context: { element: HTMLElement, options?: ImportOptions });

	model: { [ key: string ]: any };
	options?: ImportOptions;
	upload: Command;

	load(e: FileChangeEvent): void;
}
