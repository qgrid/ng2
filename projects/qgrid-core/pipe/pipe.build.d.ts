import { ColumnModel } from '../column-type/column.model';
import { Model } from '../model/model';

export declare function buildFromModel(model: Model, valueFactory?: (column: ColumnModel) => (row: any, value?: any) => any): Promise<any>;
