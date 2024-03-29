import { Scene } from '../../scene/scene';
import { Pipe } from '../pipe';

export const columnPipeUnit = [
  (_, context, next) => {
    const { view } = context.model;
    const { rows, pivot, nodes } = view();
    next({ rows, pivot, nodes });
  },
  Pipe.column,
  (memo, context, next) => {
    const { model } = context;
    const scene = new Scene(model);
    const columnLine = scene.columnLine(memo.columns);
    const tag = {
      source: context.source || 'column.pipe.unit',
      behavior: 'core',
    };

    model.view({
      columns: columnLine.map(c => c.model),
    }, tag);

    context.model.scene({
      column: {
        rows: scene.columnRows(memo.columns),
        area: scene.columnArea(memo.columns),
        line: columnLine,
      },
    }, tag);

    next(memo);
  },
];

columnPipeUnit.why = 'redraw';
