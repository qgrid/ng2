import {ColumnModel} from '../column-type/column.model';
import {IContext, INext} from '../pipe/pipe.item';

export interface IDefaultPipe {
	(memo: any, context: IContext, next: INext): void;
}

export declare class DataModel {
	constructor();

	rows: any[];
	columns: ColumnModel[];
	pipe: IDefaultPipe[];
	triggers: object;
}
