import {Table} from '../dom/table';
import {SingleOrMultipleMode} from '../row/row.model';
import {RowDetailsStatus} from './row.details.status';

export declare function flatView(table: Table, mode: string): any[];
export declare function toggleStatus(rows: any[], status: Map<any, RowDetailsStatus>, mode: SingleOrMultipleMode): Map<any, RowDetailsStatus>;
export declare function invalidateStatus(rows: any[], status: Map<any, RowDetailsStatus>): Map<any, RowDetailsStatus>;
