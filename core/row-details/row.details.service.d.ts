import { RowDetailsStatus } from './row.details.status';
import { GridModel } from '../grid/grid.model';

export declare function flatView(model: GridModel, mode: 'single' | 'multiple'): any[];

export declare function toggleStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: 'single' | 'multiple'):
	Map<any, RowDetailsStatus>;

export declare function invalidateStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: 'single' | 'multiple'):
	Map<any, RowDetailsStatus>;
