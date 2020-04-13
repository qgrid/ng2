import { ColumnModel } from '../column-type/column.model';
import { ColumnView } from '../scene/view/column.view';

export declare function flatten(node: Node): ColumnView[][];
export declare function collapse(rows: ColumnView[][]): ColumnView[];
export declare function expand(rows: ColumnView[][]): ColumnView[][];
