import { Range } from '../../infrastructure/range';
import { Bag } from '../bag';
import { FakeElement } from '../fake/element';
import { Selector } from './selector';
import { UnitFactory } from './unit.factory';

describe('Selector', () => {
  const row1 = [
    {
      colSpan: 1,
    },
    {
      colSpan: 2,
    },
  ];
  row1.forEach(td => td.parentElement = row1);
  const row2 = [];
  const rowRange = new Range(1, 3);
  const columnRange = new Range(1, 4);
  const matrix = [row1, row2];
  const bag = new Bag();
  bag.addRow({
    element: row1,
    model: [1,2],
    index: 0,
  });
  bag.addRow({
    element: row2,
    model: [],
    index: 1,
  });
  const factory = new UnitFactory(rowRange, columnRange);
  const selector = new Selector(matrix, bag, factory);

  describe('columnCount', () => {
    it('returns row cells', () => {
      const result = selector.columnCount(0);
      expect(result).to.equal(2);
    });
    it('returns 0 if row wasn`t found', () => {
      const result = selector.columnCount(2);
      expect(result).to.equal(0);
    });
  });

  describe('row', () => {
    it('creates row', () => {
      const test = {
        element: row1,
        index: 1,
      };

      const result = selector.row(0);

      expect(result).to.eql(test);
    });
    it('creates row using FakeElement', () => {
      const test = {
        element: new FakeElement(),
        index: 4,
      };

      const result = selector.row(3);

      expect(result).to.eql(test);
    });
  });

  describe('cell', () => {
    it('creates cell', () => {
      const test = {
        element: row1[1],
        rowIndex: 1,
        columnIndex: 2,
      };

      const result = selector.cell(0, 1);

      expect(result).to.eql(test);
    });
    it('creates cell using FakeElement', () => {
      const test = {
        element: new FakeElement(),
        rowIndex: 4,
        columnIndex: 4,
      };

      const result = selector.cell(3, 3);

      expect(result).to.eql(test);
    });
  });

  describe('rowCells', () => {
    it('creates cells', () => {
      const test1 = {
        element: row1[0],
        rowIndex: 1,
        columnIndex: 1,
      };
      const test2 = {
        element: row1[1],
        rowIndex: 1,
        columnIndex: 2,
      };

      const result = selector.rowCells(0);

      expect(result[0]).to.eql(test1);
      expect(result[1]).to.eql(test2);
    });
    it('returns empty array if row was not found', () => {
      const result = selector.rowCells(3);
      expect(result)
        .to.be.an.instanceOf(Array)
        .and.to.have.lengthOf(0);
    });
  });

  describe('rows', () => {
    it('undefined case', () => {
      const test1 = {
        element: row1,
        index: 1,
      };
      const test2 = {
        element: row2,
        index: 2,
      };

      const result = selector.rows(undefined);

      expect(result[0]).to.eql(test1);
      expect(result[1]).to.eql(test2);
    });

    it('rows', () => {
      const test = {
        element: row1,
        index: 1,
      };

      const result = selector.rows(1);

      expect(result[0]).to.eql(test);
    });
  });

  describe('rowCount', () => {
    const td0 = { colSpan: 1, rowSpan: 1 };
    const td1 = { colSpan: 2, rowSpan: 2 };
    const row1 = [td0, td1];
    const row2 = [];
    const rowRange = new Range(1, 3);
    const columnRange = new Range(1, 4);
    const matrix = [[td0, td1], [null, td1]];
    const bag = new Bag();
    bag.addRow(row1);
    bag.addRow(row2);
    const factory = new UnitFactory(rowRange, columnRange);
    const selector = new Selector(matrix, bag, factory);

    it('returns row number', () => {
      const result = selector.rowCount(1);
      expect(result).to.equal(1);
    });
  });

  describe('columnCells', () => {
    it('returns cell', () => {
      const test = {
        element: row1[0],
        rowIndex: 1,
        columnIndex: 1,
      };

      const result = selector.columnCells(0);

      expect(result[0]).to.eql(test);
    });
  });
});
