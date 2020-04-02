import { RowDetailsStatus } from './row.details.status';
import { Model } from '../infrastructure/model';

export declare function flatView(model: Model, mode: 'single' | 'multiple'): any[];

export declare function toggleStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: 'single' | 'multiple'):
	Map<any, RowDetailsStatus>;

export declare function invalidateStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: 'single' | 'multiple'):
	Map<any, RowDetailsStatus>;
