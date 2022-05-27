import { guid, isFunction } from '@qgrid/core';
import * as patch from '../patch';
import * as utility from '../utility';
import { Expression, GroupExpression } from './expression';
import { GroupSchema } from './group.schema';
import { Line } from './line';
import { Node } from './node';
import { nodeSchema, Schema } from './node.schema';
import { EmptyStatement, IStatement } from './statement';

export class ExpressionBuilder {
  constructor(
    private settings: Partial<IStatement>,
  ) { }

  build<T>(statements: IStatement[]): T {
    const NodeSchemaT = nodeSchema(GroupSchema);

    const settings = this.settings;
    statements
      .concat([new EmptyStatement()])
      .forEach(statement => {
        const factory = function (this: Schema, ...args: [Expression] | [string, Expression]) {
          let id = guid();
          let sampleExpression: Expression;
          if (args.length > 1) {
            id = args[0] as string;
            sampleExpression = args[1];
          } else if (args.length === 1) {
            sampleExpression = args[0];
          }

          const build = function (node: Node, line: Line) {
            const expression =
              utility.defaults<Expression>(
                sampleExpression,
                statement.defaults,
                settings.defaults,
              );

            expression.id = id;
            expression.type = statement.type;
            expression.templateUrl = statement.templateKey;

            const group = new GroupExpression();
            group.id = id;
            group.expressions.push(expression);

            line.add(group);
            patch.methodsOf(expression).with(node, line);

            const keys = Object.keys(expression) as Array<keyof Expression>;

            keys.forEach(key => {
              const sourceFunction = expression[key] as (...arg: unknown[]) => boolean;

              if (isFunction(sourceFunction)) {
                expression[key] = (...context: unknown[]) => {
                  const result = sourceFunction.apply(expression, context);

                  // TODO add decorator for mutable methods instead of trigger
                  if (!line.immutable) {
                    expression.method = expression.method || [];
                    if (expression.method.indexOf(key as string) < 0) {
                      expression.method.push(key as string);
                    }

                    line.immutable = true;
                  }
                  return result;
                };
              }
            });

            return node;
          };

          this.plan.push(build);
          this.planMap[id] = build;

          return this;
        };

        const groupFactory = function (this: Schema, ...args: (string | Expression)[]) {
          let id = guid();
          let sampleExpression: Expression;
          if (args.length > 1) {
            id = args[0] as string;
            sampleExpression = args[1] as Expression;
          } else if (args.length === 1) {
            sampleExpression = args[0] as Expression;
          }

          const build = function (node: Node, line: Line, expressionGroup: GroupExpression) {
            const expression =
              utility.defaults<Expression>(
                sampleExpression,
                statement.defaults,
                settings.defaults,
              );

            expression.id = id;
            expression.type = statement.type;
            expression.templateUrl = statement.templateKey;
            expressionGroup.expressions.push(expression);

            patch.methodsOf(expression).with(node, line);

            return node;
          };

          this.plan.push(build);

          return this;
        };

        (NodeSchemaT as typeof NodeSchemaT & { prototype: any }).prototype[statement.type as keyof typeof NodeSchemaT] = factory;
        (GroupSchema as typeof GroupSchema & { prototype: any }).prototype[statement.type as keyof typeof GroupSchema] = groupFactory;
      });

    // TODO: think how to avoid this
    return new NodeSchemaT() as any as T;
  }
}
