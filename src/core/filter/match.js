import PredicateVisitor from 'core/expression/predicate.visitor';
import buildExpression from 'core/expression/expression.build';
import * as columnService from 'core/column/column.service';
import {yes} from 'core/services/utility';

export default function (context) {
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