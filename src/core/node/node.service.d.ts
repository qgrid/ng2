import { Node } from './node';
import { Model } from '../infrastructure/model';

export declare function flattenFactory(model: Model): (nodes: Node[]) => Node[];
export declare function traverse(nodes: Node[], visit: (node: Node) => any): void;
export declare function some(nodes: Node[], test: (node: Node) => boolean): boolean;
