import { Node } from './node';
import { Model } from '../infrastructure/model';

export declare function preOrderDFS(nodes: Node[], visit: (node: Node, parent: Node | null, index: number) => boolean | any, memo: any): any;
export declare function findLeaves(node: Node): Node[];
export declare function find(node: Node, test: (node: Node) => boolean): { node: Node, parent: Node, index: number, path: Node[] } | null;
export declare function copy(node: Node): Node;