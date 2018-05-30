import { Node } from './node';

export declare function traverse(nodes: Node[], visit: (node: Node) => any): void;
export declare function flatView(nodes: Node[], result?: Node[]): Node[];
export declare function some(nodes: Node[], test: (node: Node) => boolean): boolean;
