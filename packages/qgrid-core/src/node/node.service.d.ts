import { Node } from './node';

export declare function calk(node: Node): Node;
export declare function bend(line: Node[]): Node;
export declare function findLeaves(node: Node): Node[];
export declare function filterNode(
	node: Node,
	test: (node: Node) => boolean
): Node;
export declare function findNode(
	node: Node,
	test: (node: Node) => boolean
): { node: Node; parent: Node; index: number; path: Node[] } | null;
export declare function preOrderDFS(
	nodes: Node[],
	visit: (node: Node, memo: any, parent: Node | null, index: number) => any, memo: any
): any;
