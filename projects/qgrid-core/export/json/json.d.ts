import { ColumnModel } from '../../column-type/column.model';

export interface JsonOptions {
	structure: string;
}

export declare class JsonExport {
	write(rows: any[], columns: ColumnModel[], options?: JsonOptions): string;
}
