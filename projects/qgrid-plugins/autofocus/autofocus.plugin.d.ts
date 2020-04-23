import { Model } from '@qgrid/core/infrastructure/model';
import { DomTable } from '@qgrid/ngx';
import { Disposable } from '@qgrid/core/infrastructure/disposable';

export declare class AutofocusPlugin {
	constructor(
		model: Model,
		table: DomTable,
		markup: { [key: string]: HTMLElement },
		disposable: Disposable
	);
}
