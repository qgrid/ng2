import { Node } from '../node/node';
import { PipeCallback } from './pipe.types';
import { SceneStateColumnRows } from '../scene/scene.state';

export declare type ColumnIndexPipeMemo = {
    columns: SceneStateColumnRows,
    tree: Node
};

export declare const columnIndexPipe: PipeCallback<Node, ColumnIndexPipeMemo>;