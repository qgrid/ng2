import { Model } from '../infrastructure/model';
import { ColumnView } from '../scene/view/column.view';

export declare function columnFactory(model: Model): (type: string, body?: any) => ColumnView;
