import { ColumnModel } from '../column-type/column.model';
import { RowModel } from '../row/row.model';
import { Model } from '../infrastructure/model';

export declare interface GenerateOptions {
	columnFactory: (type: string) => ColumnModel;
	deep: boolean;
	rows: RowModel[];
}

export declare function generateFactory(model: Model): (GenerateOptions) => ColumnModel[];

export declare function generate(settings: GenerateOptions): ColumnModel[];
