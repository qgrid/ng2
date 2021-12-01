import { RowDetailsStatus } from './row.details.status';
import { Model } from '../model/model';
import { RowStateMode } from '../row/row.state';

export declare function flatView(model: Model, mode: RowStateMode): any[];

export declare function toggleStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: RowStateMode):
	Map<any, RowDetailsStatus>;

export declare function invalidateStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: RowStateMode):
	Map<any, RowDetailsStatus>;
