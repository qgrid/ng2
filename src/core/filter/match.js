import {PredicateVisitor, build as buildExpression} from '../expression';
import * as columnService from '../column/column.service';
import {yes} from '../utility';

export function match(context) {
	const model = context.model;
	const expression = buildExpression(model.filter().by);
	if (expression !== null) {
		const valueFactory = context.valueFactory;
		const columnMap = columnService.map(model.data().columns);
		const visitor = new PredicateVisitor(key => valueFactory(columnMap[key]));
		return visitor.visit(expression);
	}

	return yes;
}