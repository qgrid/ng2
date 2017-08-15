import {ColumnModel} from '../column-type/column.model';

export interface IOptions {
  structure: string;
}

export declare class Json {
  write(rows: any[], columns: ColumnModel[], options?: IOptions): string;
}
