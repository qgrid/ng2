import { Node } from '../node/node';
import { Model } from '../model/model';

export declare function flattenFactory(model: Model): (nodes: Node[]) => Node[];
export declare function findFirstLeaf(node: Node): Node | null;