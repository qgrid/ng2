import { Range } from '../../infrastructure/range';
import { hasOwnProperty } from '../../utility/kit';
import { Matrix } from './matrix';
import { Selector } from './selector';
import { SelectorMediator } from './selector.mediate';
import { UnitFactory } from './unit.factory';

export class SelectorFactory {
  constructor(bag, selectorMark) {
    this.bag = bag;
    this.selectorMark = selectorMark;
  }

  create() {
    const { bag, selectorMark } = this;

    const matrix = new Matrix(tr => bag.elements.has(tr));
    const entries =
      selectorMark
        .select()
        .map(({ element, rowRange, columnRange }) => ({
          matrix: matrix.build(element),
          rowRange,
          columnRange,
        }));

    const selectorFactory = context =>
      entries.map(entry => ({
        invoke: f => {
          const unitFactory = new UnitFactory(entry.rowRange, entry.columnRange);
          const selector = new Selector(entry.matrix, bag, unitFactory);

          const args = [];
          args.push(selector);

          if (hasOwnProperty.call(context, 'row')) {
            args.push(context.row - entry.rowRange.start);
          }

          if (hasOwnProperty.call(context, 'column')) {
            args.push(context.column - entry.columnRange.start);
          }

          return f(...args);
        },
      }));

    const unitFactory = new UnitFactory(new Range(0, 0), new Range(0, 0));
    return new SelectorMediator(selectorFactory, unitFactory);
  }
}
