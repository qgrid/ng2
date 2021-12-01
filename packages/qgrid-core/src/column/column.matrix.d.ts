import { SceneStateColumnLine, SceneStateColumnRows } from '../scene/scene.state';

export declare function flattenRows(node: Node): SceneStateColumnRows;
export declare function collapse(rows: SceneStateColumnRows): SceneStateColumnLine;
export declare function expand(rows: SceneStateColumnRows): SceneStateColumnRows;
