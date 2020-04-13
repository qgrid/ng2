import { PipeContext, PipeMemo } from './pipe.item';
import { Node } from '../node/node';
import { ColumnView } from '../scene/view/column.view';

/**
 * > Under Construction.
 */
export declare const columnIndexPipe: (root: Node, context: PipeContext, next: (param: { columns: ColumnView[][], tree: Node }) => void) => any;
