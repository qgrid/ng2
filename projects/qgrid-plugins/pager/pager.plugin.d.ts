import { Model } from '@qgrid/core/infrastructure/model';
import { Disposable } from '@qgrid/core/infrastructure/disposable';
import { DomTable } from '@qgrid/ngx';

export declare class PagerPlugin {
	constructor(model: Model, table: DomTable, disposable: Disposable);
}