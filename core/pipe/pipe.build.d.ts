import { Model } from '../infrastructure/model';
import { ColumnModel } from '../column-type/column.model';

export declare function build(model: Model, valueFactory?: (column: ColumnModel) => (row: any, value?: any) => any): Promise<any>;
