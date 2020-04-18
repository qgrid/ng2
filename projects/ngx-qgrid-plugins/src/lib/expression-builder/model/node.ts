import { GridError } from '@qgrid/ngx';
import { Line } from './line';

export class Node {
	readonly attributes: { [key: string]: any } = {};
	children: Node[] = [];
	level: number;
	line: Line;

	constructor(public id: string, public schema, public parent?: Node) {
		this.level = parent ? parent.level + 1 : 0;
	}

	attr(key: string, value?) {
		if (arguments.length === 2) {
			this.attributes[key] = value;
		} else {
			return this.attributes[key];
		}
	}

	classes() {
	}

	addChildAfter(child: Node, after?: Node) {
		const index = after ? this.children.indexOf(after) : this.children.length - 1;

		this.children.splice(index + 1, 0, child);
		child.parent = this;
		child.level = this.level + 1;
	}

	addChildBefore(child: Node, before: Node) {
		const index = before ? this.children.indexOf(before) : 0;

		this.children.splice(index, 0, child);
		child.parent = this;
		child.level = this.level + 1;
	}

	addAfter(child: Node) {
		if (!this.parent) {
			throw new GridError('node', 'Can\'t add after root');
		}
		this.parent.addChildAfter(child, this);
	}

	addBefore(child: Node) {
		if (!this.parent) {
			throw new GridError('node', 'Can\'t add after root');
		}
		this.parent.addChildBefore(child, this);
	}

	clone() {
		return this.schema.apply(new Node(this.id, this.schema));
	}

	remove() {
		if (!this.parent) {
			throw new GridError('node', 'Root element can\'t be removed');
		}

		const index = this.parent.children.indexOf(this);
		this.parent.children.splice(index, 1);
	}

	clear() {
		this.children.forEach(child => child.parent = null);
		this.children = [];
	}

	toString(indent = 0) {
		return Array(indent).join('-') + ' ' + this.level + '\n' +
			this.children
				.map(child => {
					return child.toString(indent + 1);
				})
				.join('\n');
	}

	toTraceString() {
		if (null != this.parent) {
			let parent = this.parent;
			while (null !== parent.parent) {
				parent = parent.parent;
			}

			return parent.toString();
		}

		return this.toString();
	}
}
