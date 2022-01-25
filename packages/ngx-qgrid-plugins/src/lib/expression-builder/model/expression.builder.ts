import { guid, isFunction } from '@qgrid/core';
import * as patch from '../patch';
import * as utility from '../utility';
import { Expression, GroupExpression } from './expression';
import { GroupSchema } from './group.schema';
import { Line } from './line';
import { Node } from './node';
import { nodeSchema } from './node.schema';
import { EmptyStatement, IStatement } from './statement';


export class ExpressionBuilder {
	constructor(private settings: any) {
	}

	build<T>(statements: Array<IStatement>): T {
		const NodeSchemaT = nodeSchema(GroupSchema);

		const settings = this.settings;
		statements
			.concat([new EmptyStatement()])
			.forEach(statement => {
				const factory = function (...args: any[]) {
					let id = guid();
					let sampleExpression: Expression;
					if (args.length > 1) {
						id = args[0];
						sampleExpression = args[1];
					} else if (args.length === 1) {
						sampleExpression = args[0];
					}

					const build = function (node: Node, line: Line) {
						const expression =
							utility.defaults<Expression>(
								sampleExpression,
								statement.defaults,
								settings.defaults
							) as any;

						expression.id = id;
						expression.type = statement.type;
						expression.templateUrl = statement.templateKey;

						const group = new GroupExpression();
						group.id = id;
						group.expressions.push(expression);

						line.add(group);
						patch.methodsOf(expression).with(node, line);

						const keys = Object.keys(expression);

						keys.forEach(key => {
							const sourceFunction = expression[key];

							if (isFunction(sourceFunction)) {
								expression[key] = (...context: any[]) => {
									const result = sourceFunction.apply(expression, context);

									// TODO add decorator for mutable methods instead of trigger
									if (!line.immutable) {
										expression.method = expression.method || [];
										if (expression.method.indexOf(key) < 0) {
											expression.method.push(key);
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

				const groupFactory = function (...args: any[]) {
					let id = guid();
					let sampleExpression: Expression;
					if (args.length > 1) {
						id = args[0];
						sampleExpression = args[1];
					} else if (args.length === 1) {
						sampleExpression = args[0];
					}

					const build = function (node: any, line: any, expressionGroup: any) {
						const expression =
							utility.defaults<Expression>(
								sampleExpression,
								statement.defaults,
								settings.defaults
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

				NodeSchemaT.prototype[statement.type] = factory;
				GroupSchema.prototype[statement.type] = groupFactory;
			});

		// TODO: think how to avoid this
		return new NodeSchemaT() as T;
	}
}
