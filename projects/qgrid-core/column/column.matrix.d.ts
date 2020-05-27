import { SceneStateColumnRows, SceneStateColumnLine } from '../scene/scene.state';

export declare function flatten(node: Node): SceneStateColumnRows;
export declare function collapse(rows: SceneStateColumnRows): SceneStateColumnLine;
export declare function expand(rows: SceneStateColumnRows): SceneStateColumnRows;
