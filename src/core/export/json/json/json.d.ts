import { ColumnModel } from '../../../column-type/column.model';

export interface IJsonOptions {
	structure: string;
}

export declare class Json {
	write(rows: any[], columns: ColumnModel[], options?: IJsonOptions): string;
}
