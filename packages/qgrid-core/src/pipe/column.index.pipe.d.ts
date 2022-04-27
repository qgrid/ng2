import { Node } from '../node/node';
import { SceneStateColumnRows } from '../scene/scene.state';
import { PipeCallback } from './pipe.types';

export declare interface ColumnIndexPipeMemo {
    columns: SceneStateColumnRows;
    tree: Node;
}

export declare const columnIndexPipe: PipeCallback<Node, ColumnIndexPipeMemo>;
