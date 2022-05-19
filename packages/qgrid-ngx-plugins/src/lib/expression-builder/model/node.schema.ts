import { GridError } from '@qgrid/ngx';
import { GroupExpression } from './expression';
import { GroupSchema } from './group.schema';
import { Line } from './line';
import { Node } from './node';

export interface INodeSchema {
  schemaMap: { [key: string]: INodeSchema };

  apply(node?: Node): Node;
  attr(key: string, value: unknown): INodeSchema;
  node(id: string, build: (schema: INodeSchema) => void): INodeSchema;
  group(id: string, build: (schema: GroupSchema) => void): INodeSchema;
  get(id: string): INodeSchema;
  materialize(id: string): Node;
}

export function nodeSchema(GroupSchemaT: typeof GroupSchema) {
  return class NodeSchema implements INodeSchema {
    plan: ((node: Node, line?: Line) => ReturnType<Node['attr']> | Node)[] = [];
    planMap: { [key: string]: (node: Node, line: Line) => Node } = {};

    constructor(
      public schemaMap: { [key: string]: INodeSchema } = {},
    ) { }

    clone(): INodeSchema {
      const schema = new NodeSchema({ ...this.schemaMap });
      schema.plan = [...this.plan];
      schema.planMap = { ...this.planMap };
      return schema;
    }

    attr(key: string, value: string): INodeSchema {
      this.plan.push(node => node.attr(key, value));
      return this;
    }

    apply(node?: Node): Node {
      node = node || new Node('#root', this);

      const line = new Line(GroupSchemaT);
      node.line = line;

      this.plan.forEach(p => p(node, line));

      return node;
    }

    node(id: string, build: (schema: INodeSchema) => void): INodeSchema {
      if (!build) {
        throw new GridError('node.schema', 'Build function is not defined');
      }

      this.plan.push(node => {
        const schema = new NodeSchema(this.schemaMap);
        build(schema);

        const newNode = new Node(id, schema, node);
        schema.apply(newNode);
        node.addChildAfter(newNode);
        this.schemaMap[id] = schema;

        return node;
      });

      return this;
    }

    group(id: string, build: (schema: GroupSchema) => void): INodeSchema {
      if (!build) {
        throw new GridError('node.schema', 'Build function is not defined');
      }

      const buildGroup = (node: Node, line: Line) => {
        const group = new GroupExpression();
        group.id = id;

        const schema = new GroupSchemaT(node, line);
        build(schema);
        schema.apply(group);
        line.add(group);

        return node;
      };

      this.plan.push(buildGroup);
      this.planMap[id] = buildGroup;

      return this;
    }

    get(id: string) {
      const schema = this.schemaMap[id];
      if (!schema) {
        throw new GridError('node.schema', `Schema ${id} is not found`);
      }

      return schema;
    }

    materialize(id: string) {
      const schema = this.get(id);
      return schema.apply(new Node(id, schema));
    }
  };
}
