import {EmptyExpression, ExpressionGroup} from './expression';
import {nodeSchema} from './node-schema';
import {groupSchema} from './group-schema';
import * as utility from './services/utility';
import * as patch from './services/patch';

export function expressionBuilder(expressions, globalSettings) {
	const GroupSchema = groupSchema();
	const NodeSchema = nodeSchema(GroupSchema);

	expressions.concat([EmptyExpression]).forEach(function (settings) {
		const factory = function () {
			const id = utility.identity(), parameters = {};
			if (arguments.length > 1) {
				id = arguments[0];
				parameters = arguments[1];
			} else if (arguments.length === 1) {
				parameters = arguments[0];
			}

			const build = function (node, line) {
				const expression = utility.defaults(parameters, settings.defaults, globalSettings.defaults);
				expression.id = id;
				expression.type = settings.type;

				const group = new ExpressionGroup();
				group.id = id;
				group.expressions.push(expression);
				expression.template = settings.templateUrl;
				line.add(group);

				patch.methodsOf(expression).with(node, line);

				const keys = Object.keys(expression);

				keys.forEach(function (key) {
					const sourceFunction = expression[key];

					if (utility.isFunction(sourceFunction)) {
						expression[key] = function () {
							const argList = utility.asArray(arguments);
							const result = sourceFunction.apply(expression, argList);

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

		const groupFactory = function () {
			const id = utility.identity(), parameters = {};
			if (arguments.length > 1) {
				id = arguments[0];
				parameters = arguments[1];
			} else if (arguments.length === 1) {
				parameters = arguments[0];
			}

			const build = function (node, line, expressionGroup) {
				const expression = utility.defaults(parameters, settings.defaults, globalSettings.defaults);
				expression.id = id;
				expression.type = settings.type;
				expression.template = settings.templateUrl;
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
