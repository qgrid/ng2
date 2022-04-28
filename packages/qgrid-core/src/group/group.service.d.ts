import { Model } from '../model/model';
import { Node } from '../node/node';

export declare function flattenFactory(model: Model): (nodes: Node[]) => Node[];
export declare function findFirstLeaf(node: Node): Node | null;
