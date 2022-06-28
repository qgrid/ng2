import * as columnService from '../column/column.service';
import { buildExpression } from '../expression/expression.build';
import { PredicateVisitor } from '../expression/predicate.visitor';
import { getValue } from '../services/value';
import { yes } from '../utility/kit';

export function match(context) {
  const { model } = context;

  const expression = buildExpression(model.filter().by);
  if (expression !== null) {
    const { labelFactory } = context;
    const { assertFactory } = model.filter();

    const columnMap = columnService.mapColumns(model.columnList().line);

    const valueColumnFactory = key => {
      const column = columnMap[key];
      if (column.type === 'array') {
        return row => getValue(row, column);
      }

      return labelFactory(column);
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
        getType,
      );

    return visitor.visit(expression);
  }

  return yes;
}
