import { Model } from 'qgrid-core/infrastructure/model';
import { Table } from 'qgrid-core/dom/table';
import { Disposable } from 'qgrid-core/infrastructure/disposable';

export declare class AutofocusView {
	constructor(
		model: Model,
		table: Table,
		markup: { [key: string]: HTMLElement },
		disposable: Disposable
	);
}
