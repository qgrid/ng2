import { Model } from '../../core/infrastructure/model';
import { Table } from '../../core/dom/table';
import { Disposable } from '../../core/infrastructure/disposable';

export declare class AutofocusView extends Disposable {
	constructor(model: Model, table: Table, markup: { [key: string]: HTMLElement });
}
