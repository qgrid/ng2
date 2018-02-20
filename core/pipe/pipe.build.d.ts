import { Model } from '../infrastructure/model';

export declare function build(model: Model, valueFactory?: (column: ColumnModel) => (row: any, value?: any) => any): Promise<any>;
