import { Range } from '../../infrastructure/range';
import { UnitFactory } from './unit.factory';

describe('UnitFactory', () => {
  const element = 'div';
  const rowIndex = 2;
  const columnIndex = 3;
  const rowRange = new Range(1,3);
  const columnRange = new Range(1,4);
  const unitFactory = new UnitFactory(rowRange, columnRange);
  const cellResult = {
    element: 'div',
    rowIndex: 3,
    columnIndex: 4,
  };
  const rowResult = {
    element: 'div',
    index: 3,
  };

  describe('cell', () => {
    it('returns cell', () => {
      const result = unitFactory.cell(element, rowIndex, columnIndex);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(cellResult));
    });
  });

  describe('row', () => {
    it('returns row', () => {
      const result = unitFactory.row(element, rowIndex);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(rowResult));
    });
  });
});
