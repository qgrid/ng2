import {Table} from '../dom/table';
import {SingleOrMultipleMode} from '../row/row.model';

export declare function flatView(table: Table): any[];
export declare function toggleStatus(rows: any[], status: Map, mode: SingleOrMultipleMode): Map;
export declare function invalidateStatus(rows: any[], status: Map): Map;