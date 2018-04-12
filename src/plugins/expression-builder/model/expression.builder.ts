import { guid } from 'ng2-qgrid/core/services/guid';
import { isFunction } from 'ng2-qgrid/core/utility/index';
import { EmptyExpression, GroupExpression } from './expression';
import { nodeSchema } from './node.schema';
import { GroupSchema } from './group.schema';
import * as utility from '../utility';
import * as patch from '../patch';
import { Node } from './node';
import { Line } from './line';
import { Expression } from './expression';

export function expressionBuilder(expressions, globalSettings) {
	const NodeSchema = nodeSchema(GroupSchema);

	expressions.concat([EmptyExpression]).forEach(settings => {
		const factory = (...args) => {
			let id = guid();
			let expression: Expression;
			if (args.length > 1) {
				id = args[0];
				expression = args[1];
			} else if (args.length === 1) {
				expression = args[0];
			}

			const build = (node: Node, line: Line) => {
				expression = utility.defaults<Expression>(expression, settings.defaults, globalSettings.defaults);
				expression.id = id;
				expression.type = settings.type;

				const group = new GroupExpression();
				group.id = id;
				group.expressions.push(expression);
				expression.templateUrl = settings.templateUrl;
				line.add(group);

				patch.methodsOf(expression).with(node, line);

				const keys = Object.keys(expression);

				keys.forEach(key => {
					const sourceFunction = expression[key];

					if (isFunction(sourceFunction)) {
						expression[key] = (...args) => {
							const result = sourceFunction.apply(expression, args);

							// TODO add decorator for muttable methods instead of trigger
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

		const groupFactory = (...args) => {
			let id = guid();
			let expression: Expression;
			if (args.length > 1) {
				id = args[0];
				expression = args[1];
			} else if (args.length === 1) {
				expression = args[0];
			}

			const build = function (node, line, expressionGroup) {
				expression = utility.defaults<Expression>(expression, settings.defaults, globalSettings.defaults);
				expression.id = id;
				expression.type = settings.type;
				expression.templateUrl = settings.templateUrl;
				expressionGroup.expressions.push(expression);

				patch.methodsOf(expression).with(node, line);

				return node;
			};

			this.plan.push(build);

			return this;
		};

		NodeSchema.prototype[settings.type] = factory;
		GroupSchema.prototype[settings.type] = groupFactory;
	});

	return new NodeSchema();
}
