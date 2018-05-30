import { isArray } from '../../utility/kit';

const NODE_TYPE = {
	ELEMENT: 1,
	ATTRIBUTE: 2,
	TEXT: 3,
	DOCUMENT: 9
};

export class Xml {
	read(text) {
		if (!text) {
			return [];
		}
		const parser = new DOMParser();
		const root = parser.parseFromString(text, 'text/xml').documentElement;
		const statistics = this.getStatistics(root);
		const graph = this.build(root, statistics, 'root');
		const key = Object.keys(graph)[0];
		const result = graph[key];
		if (isArray(result)) {
			return result;
		}

		return [result];
	}

	arrayFromChildren(node, statistics, path, tag) {
		const result = [];
		const children = Array.from(node.children).filter(child => child.nodeName === tag);
		for (let child of children) {
			result.push(this.buildNonArray(child, statistics, path));
		}

		return result;
	}

	build(node, statistics, path = 'root') {
		const st = statistics.get(path);
		if (st.isArray) {
			return this.arrayFromChildren(node.parentNode, statistics, path, node.nodeName);
		}

		return this.buildNonArray(node, statistics, path);
	}

	buildNonArray(node, statistics, path = 'root') {
		const st = statistics.get(path);
		if (st.isObject) {
			const result = {};
			const visited = new Set();
			for (let attr of Array.from(node.attributes)) {
				result[attr.name] = attr.value;
			}

			for (let child of Array.from(node.children)) {
				const childPath = this.getPath(path, child.nodeName);
				if (visited.has(childPath)) {
					continue;
				}

				visited.add(childPath);
				result[child.nodeName] = this.build(child, statistics, childPath);
			}

			return result;
		}

		if (st.isText) {
			return node.textContent;
		}

		return null;
	}

	info(node, lastInfo) {
		if (!lastInfo) {
			lastInfo = {
				isArray: false,
				isObject: false,
				isText: false
			};
		}

		return {
			isArray: lastInfo.isArray || Array.from(node.parentNode.children).filter(child => child.nodeName === node.nodeName).length > 1,
			isObject: lastInfo.isObject || node.children.length > 0 || node.attributes.length > 0,
			isText: lastInfo.isText || this.isTextContainer(node)
		};
	}

	getStatistics(node, path = 'root', statistics = new Map()) {
		statistics.set(path, this.info(node, statistics.get(path)));

		const children = Array.from(node.children);
		if (children.length > 0) {
			for (let child of children) {
				const childPath = this.getPath(path, child.nodeName);
				this.getStatistics(child, childPath, statistics);
			}
		}

		return statistics;
	}

	isTextContainer(node) {
		return node.nodeType === NODE_TYPE.ELEMENT && !node.children.length && node.childNodes.length;
	}

	getPath(...args) {
		return args.join('/');
	}
}