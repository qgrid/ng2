import {Table} from "../dom/table";
import {SingleOrMulipleMode} from "../row/row.model";

export declare function flatView(table: Table): any[];

export declare function toggleStatus(rows: any[], status: Map, mode: SingleOrMulipleMode): Map;