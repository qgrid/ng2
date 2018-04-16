import { Node } from './model/node';
import { Line } from './model/line';
import { GroupExpression } from './model/expression';
import { INodeSchema } from './model/node.schema';
import { override, indexOf } from './utility';

export declare interface ISerializationNode {
	id: string;
	attributes: Object;
	children: ISerializationNode[];
	line: ISerializationGroup[];
}

export declare interface ISerializationGroup {
	id: string;
	expressions: ISerializationExpression[];
}

export declare interface ISerializationExpression {
	id: string;
	type: string;
	method: Array<string>;
}

export class SerializationService {
	serialize(node: Node): ISerializationNode {
		return new Serializer(node).serialize();
	}

	deserialize(schema: INodeSchema, data: ISerializationNode): Node {
		return new Deserializer(schema).deserialize(data);
	}
}

function traverse(node: Node, map: Object) {
	if (!map.hasOwnProperty(node.id)) {
		map[node.id] = node;
	}

	for (let i = 0, length = node.children.length; i < length; i++) {
		const child = node.children[0];
		traverse(child, map);
	}
}

class Serializer {
	constructor(private node: Node) {
	}

	serialize(): ISerializationNode {
		const groups = this.node.line.expressions.map(expr => this.serializeGroup(expr));

		return {
			id: this.node.id,
			attributes: this.serializeAttributes(this.node),
			children: this.node.children.map(child => new Serializer(child).serialize()),
			line: groups.filter(group => group.expressions.length)
		};
	}

	serializeGroup(group): ISerializationGroup {
		return {
			id: group.id,
			expressions: group.expressions
				.filter(expr => this.canSerialize(expr))
				.map(expr => this.serializeExpression(expr))
		};
	}

	serializeExpression(expression): ISerializationExpression {
		const result = {} as ISerializationExpression;

		const serializeAttr = this.node.attr('serialize');
		const serializableProps = serializeAttr[expression.id];
		for (let i = 0, length = serializableProps.length; i < length; i++) {
			const prop = serializableProps[i];
			result[prop] = expression[prop];
		}

		result.id = expression.id;
		result.type = expression.type;
		result.method = expression.method;

		return result;
	}

	serializeAttributes(node) {
		const serializeAttr = this.node.attr('serialize');
		if (serializeAttr && serializeAttr['@attr']) {
			const props = serializeAttr['@attr'];
			return props.reduce((memo, attr) => {
				memo[attr] = this.node.attr(attr);
				return memo;
			}, {});
		}
		return {};
	}

	canSerialize(expression) {
		const serializeAttr = this.node.attr('serialize');
		if (!serializeAttr) {
			return false;
		}

		const props = serializeAttr[expression.id];
		return !!(props && props.length);
	}
}

class Deserializer {
	constructor(private schema: INodeSchema) {
	}

	deserialize(data: ISerializationNode, parent: Node = null, nodeMap?: { [key: string]: Node }) {
		nodeMap = nodeMap || {};

		let node: Node;
		if (!parent) {
			node = new Node(data.id, this.schema);
			this.schema.apply(node);
			traverse(node, nodeMap);
			node.clear();
		} else {
			node = nodeMap[data.id].clone();
			parent.addChildAfter(node);
			traverse(parent, nodeMap);
			node.clear();
		}

		override(node.attributes, data.attributes);

		this.deserializeLine(node, node.line, data.line);

		const children = data.children;
		const length = children.length;
		for (let i = 0; i < length; i++) {
			const child = children[i];
			const childSchema = this.schema.schemaMap[child.id];
			new Deserializer(childSchema).deserialize(child, node, nodeMap);
		}

		return node;
	}

	private deserializeLine(node: Node, line: Line, dataGroups: ISerializationGroup[]) {
		for (let i = 0, length = dataGroups.length; i < length; i++) {
			const dataGroup = dataGroups[i];
			const exprGroup = line.get(dataGroup.id) as GroupExpression;
			this.deserializeGroup(node, line, exprGroup, dataGroup);
		}
	}

	private deserializeGroup(node: Node, line: Line, group: GroupExpression, dataGroup: ISerializationGroup) {
		const dataExpressions = dataGroup.expressions;
		const length = dataExpressions.length;

		let index;
		for (let i = 0; i < length; i++) {
			const dataExp = dataExpressions[i];
			index = indexOf(group.expressions, expr => expr.id === dataExp.id);
			override(group.expressions[index], dataExp);
		}

		for (let i = 0; i < length; i++) {
			const dataExpr = dataExpressions[i];
			if (dataExpr.method) {
				dataExpr.method.forEach(m => {
					group.expressions[index][m](node, line);
					group.expressions[index].method = dataExpressions[i].method;
				});
			}
		}
	}
}
