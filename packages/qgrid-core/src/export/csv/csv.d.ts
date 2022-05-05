import { ColumnModel } from '../../column-type/column.model';

export declare class CsvExport {
  write(rows: any[], columns: ColumnModel[]): string;
}
