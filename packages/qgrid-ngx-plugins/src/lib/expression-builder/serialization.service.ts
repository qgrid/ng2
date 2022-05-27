/* eslint-disable no-use-before-define */
import { Injectable } from '@angular/core';
import { Expression, GroupExpression } from './model/expression';
import { Line } from './model/line';
import { Node } from './model/node';
import { INodeSchema } from './model/node.schema';
import { indexOf, override } from './utility';

class Serializer {
  constructor(
    private node: Node,
  ) { }

  serialize(): ISerializationNode {
    const groups = this.node.line.expressions.map(expr => this.serializeGroup(expr));

    return {
      id: this.node.id,
      attributes: this.serializeAttributes(this.node),
      children: this.node.children.map(child => new Serializer(child).serialize()),
      line: groups.filter(group => group.expressions.length),
    };
  }

  serializeGroup(group: GroupExpression): ISerializationGroup {
    return {
      id: group.id,
      expressions: group.expressions
        .filter(expr => this.canSerialize(expr))
        .map(expr => this.serializeExpression(expr)),
    };
  }

  serializeExpression(expression: ISerializationExpression) {
    const result = {} as ISerializationExpression;

    const serializeAttr = this.node.attr('serialize') as { [key: string]: (keyof ISerializationExpression)[] };
    const serializableProps = serializeAttr[expression.id];
    for (let i = 0, length = serializableProps.length; i < length; i++) {
      const prop = serializableProps[i];
      result[prop] = expression[prop] as string & string[];
    }

    result.id = expression.id;
    result.type = expression.type;
    result.method = expression.method;

    return result;
  }

  serializeAttributes(node: Node) {
    const serializeAttr = node.attr('serialize') as { ['@attr']: string[] };
    if (serializeAttr && serializeAttr['@attr']) {
      const props: string[] = serializeAttr['@attr'];
      return props.reduce((memo, attr) => {
        memo[attr] = node.attr(attr);
        return memo;
      }, {} as { [key: string]: string | Record<string, unknown> });
    }
    return {};
  }

  canSerialize(expression: Expression) {
    const serializeAttr = this.node.attr('serialize') as { [key: string]: string[] };
    if (!serializeAttr) {
      return false;
    }

    const props = serializeAttr[expression.id];
    return !!(props && props.length);
  }
}

class Deserializer {
  constructor(
    private schema: INodeSchema,
  ) { }

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

    let index: number;
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

function traverse(node: Node, map: { [key: string]: Node }) {
  if (!Object.prototype.hasOwnProperty.call(map, node.id)) {
    map[node.id] = node;
  }

  for (let i = 0, length = node.children.length; i < length; i++) {
    const child = node.children[0];
    traverse(child, map);
  }
}

export declare interface ISerializationNode {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: { [key: string]: any };
  children: ISerializationNode[];
  line: ISerializationGroup[];
  kind?: string;
}

export declare interface ISerializationGroup {
  id: string;
  expressions: ISerializationExpression[];
}

export declare interface ISerializationExpression {
  id: string;
  type: string;
  method: string[];
  value?: string | null;
  values?: string[];
}

@Injectable()
export class SerializationService {
  serialize(node: Node): ISerializationNode {
    return new Serializer(node).serialize();
  }

  deserialize(schema: INodeSchema, data: ISerializationNode): Node {
    return new Deserializer(schema).deserialize(data);
  }
}
