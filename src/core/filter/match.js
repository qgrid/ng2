import * as columnService from '../column/column.service';
import { build as buildExpression } from '../expression/expression.build';
import { PredicateVisitor } from '../expression/predicate.visitor';
import { yes } from '../utility/kit';

export function match(context) {
	const { model } = context;

	const expression = buildExpression(model.filter().by);
	if (expression !== null) {
		const { labelFactory } = context;
		const { assertFactory } = model.filter();

		const columnMap = columnService.map(model.columnList().line);

		const valueColumnFactory = key => labelFactory(columnMap[key]);
		const assertColumnFactory = key => assertFactory(columnMap[key]);

		const visitor = new PredicateVisitor(valueColumnFactory, assertColumnFactory);
		return visitor.visit(expression);
	}

	return yes;
}