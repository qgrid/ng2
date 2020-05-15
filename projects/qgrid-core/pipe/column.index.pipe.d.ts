import { Node } from '../node/node';
import { ColumnView } from '../scene/view/column.view';
import { PipeCallback } from './pipe.types';

export declare type ColumnIndexPipeMemo = {
    columns: ColumnView[][],
    tree: Node
};

export declare const columnIndexPipe: PipeCallback<Node, ColumnIndexPipeMemo>;