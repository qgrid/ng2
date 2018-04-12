import {Injectable} from '@angular/core';
import {Node} from '../model/node';

@Injectable()
export class SerializationService {
	serialize(node: Node) {
		return new Serializer(node).serialize();
	}
}

class Serializer {
	constructor(private node: Node) {
	}

	serialize() {
		const groups = this.node.line.expressions.map(e => this.serializeGroup(e));

		return {
			id: this.node.id,
			attributes: this.serializeAttributes(this.node),
			children: this.node.children.map(child => new Serializer(child).serialize()),
			line: groups.filter(group => group.expressions.length)
		};
	}

	serializeGroup(group) {
		return {
			id: group.id,
			expressions: group.expressions
				.filter(e => this.serializable(e))
				.map(e => this.serializeExpression(e))
		};
	}

	serializeExpression(expression) {
		const serializeAttr = this.node.attr('serialize');

		const result = {};
		const propertiesToSerialize = serializeAttr[expression.id];

		for (let i = 0, length = propertiesToSerialize.length; i < length; i++) {
			const prop = propertiesToSerialize[i];
			result[prop] = expression[prop];
		}
		result.id = expression.id;
		result.type = expression.type;
		result.method = expression.method;

		return result;
	}

	serializeAttributes(node) {
		const serialize = this.node.attr('serialize');
		if (serialize && serialize['@attr']) {
			const attrs = serialize['@attr'];
			return attrs.reduce(function (memo, attr) {
				memo[attr] = this.node.attr(attr);
				return memo;
			}, {});
		}
		return {};
	}

	serializable(expression) {
		const serializeAttr = this.node.attr('serialize');
		if (!serializeAttr) {
			return false;
		}

		const propertiesToSerialize = serializeAttr[expression.id];

		return propertiesToSerialize && propertiesToSerialize.length;
	}
}
