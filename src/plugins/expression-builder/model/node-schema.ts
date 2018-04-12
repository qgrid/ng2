import {Line} from './line';
import {AppError} from 'ng2-qgrid/core/infrastructure/error';
import {ExpressionGroup} from './expression';

export function nodeSchema(GroupSchema) {
	return class NodeSchema {
		public plan: any[];
		public planMap: any;
		public schemaMap: any;

		constructor(map = {}) {
			this.plan = [];
			this.planMap = {};
			this.schemaMap = map;
		}

		clone() {
			const schema = new NodeSchema({...this.schemaMap});
			schema.plan = [...this.plan];
			schema.planMap = {...this.planMap};
			return schema;
		}

		attr(key, value) {
			this.plan.push(node => node.attr(key, value));
			return this;
		}

		apply(node) {
			node = node || new Node('#root', this);

			const line = new Line(GroupSchema);
			node.line = line;

			this.plan.forEach(p => p(node, line));

			return node;
		}

		node(id, build) {
			if (!build) {
				throw new AppError('Build function is not defined');
			}

			this.plan.push((node, line) => {
				const schema = new NodeSchema(self.schemaMap);
				build(schema);

				const newNode = new Node(id, schema, node);
				schema.apply(newNode);
				node.addChildAfter(newNode);
				self.schemaMap[id] = schema;

				return node;
			});

			return this;
		}

		group(id, build) {
			if (!build) {
				throw new AppError('Build function is not defined');
			}

			const buildGroup = function (node, line) {
				const expressionGroup = new ExpressionGroup();
				expressionGroup.id = id;

				const schema = new GroupSchema(node, line);
				build(schema);
				schema.apply(expressionGroup);
				line.add(expressionGroup);

				return node;
			};

			this.plan.push(buildGroup);
			this.planMap[id] = buildGroup;

			return this;
		}

		get(id) {
			const schema = this.schemaMap[id];
			if (!schema) {
				throw new Error(`Schema ${id} is not found`);
			}

			return schema;
		}

		materialize(id) {
			const schema = this.get(id);
			return schema.apply(new Node(id, schema));
		}
	};
}
