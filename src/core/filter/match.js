import {PredicateVisitor, build as buildExpression} from '../expression';
import * as columnService from '../column/column.service';
import {yes} from '../utility/index';

export function match(context) {
	const model = context.model;
	const expression = buildExpression(model.filter().by);
	if (expression !== null) {
		const valueFactory = context.labelFactory;
		const assertFactory = model.filter().assertFactory;
		const columnMap = columnService.map(model.data().columns);

		const valueColumnFactory = key => valueFactory(columnMap[key]);
		const assertColumnFactory = key => assertFactory(columnMap[key]);
		const visitor = new PredicateVisitor(valueColumnFactory, assertColumnFactory);
		return visitor.visit(expression);
	}

	return yes;
}