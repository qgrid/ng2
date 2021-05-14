import * as columnService from '../column/column.service';
import { build as buildExpression } from '../expression/expression.build';
import { PredicateVisitor } from '../expression/predicate.visitor';
import { yes } from '../utility/kit';
import { get as getValue } from '../services/value';

export function match(context) {
	const { model } = context;

	const expression = buildExpression(model.filter().by);
	if (expression !== null) {
		const { labelFactory } = context;
		const { assertFactory } = model.filter();

		const columnMap = columnService.map(model.columnList().line);

		const valueColumnFactory = (key) => {
			const column = columnMap[key];
			if (column.type === 'array') {
				return (row) => getValue(row, column);
			} else {
				return labelFactory(columnMap[key]);
			}
		};

		const assertColumnFactory = key => assertFactory(columnMap[key]);
		const getType = key => {
			const column = columnMap[key];
			return (column && column.type) || 'text';
		};

		const visitor =
			new PredicateVisitor(
				valueColumnFactory,
				assertColumnFactory,
				getType
			);

		return visitor.visit(expression);
	}

	return yes;
}