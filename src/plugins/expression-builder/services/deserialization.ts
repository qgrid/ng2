import {Injectable} from '@angular/core';
import * as utility from './utility';
import {Node} from '../model/node';

@Injectable()
export class DeserializationService {
}

function traverse(node, map) {
	if (!map.hasOwnProperty(node.id)) {
		map[node.id] = node;
	}

	for (let i = 0, length = node.children.length; i < length; i++) {
		const child = node.children[0];
		traverse(child, map);
	}
}

class Deserializer {
	constructor(private schema) {
	}

	deserialize(data, parent, nodeMap) {
		nodeMap = nodeMap || {};

		if (!parent) {
			const node = new Node(data.id, this.schema);
			schema.apply(node);
			traverse(node, nodeMap);
			node.clear();
		} else {
			const node = nodeMap[data.id];
			node = node.clone();
			parent.addChildAfter(node);
			traverse(parent, nodeMap);
			node.clear();
		}

		utility.override(node.attributes, data.attributes);

		this.deserializeLine(node, node.line, data.line);

		const children = data.children;
		const length = children.length;

		for (let i = 0; i < length; i++) {
			const child = children[i];
			new Deserializer(this.schema.schemaMap[child.id]).deserialize(child, node, nodeMap);

		}

		return node;
	}

	private deserializeLine(node, line, dataLine) {
		for (let i = 0, length = dataLine.length; i < length; i++) {
			const serializedGroup = dataLine[i];

			this.deserializeGroup(node, line, line.get(serializedGroup.id), serializedGroup);
		}
	}

	private deserializeGroup(node, line, group, dataGroup) {
		const serializedExpressions = dataGroup.expressions;
		const length = serializedExpressions.length;
		let index;

		for (let i = 0; i < length; i++) {
			const serializedExp = serializedExpressions[i];
			index = group.expressions.indexOf(expression => expression.id === serializedExp.id);

			utility.override(group.expressions[index], serializedExp);
		}

		for (let i = 0; i < length; i++) {
			if (serializedExpressions[i].method) {
				serializedExpressions[i].method.forEach(function (m) {
					group.expressions[index][m](node, line);
					group.expressions[index].method = serializedExpressions[i].method;
				});
			}
		}
	}
}
