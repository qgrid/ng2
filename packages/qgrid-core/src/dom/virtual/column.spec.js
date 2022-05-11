import { VirtualColumn } from './column';

describe('VirtualColumn', () => {
  const box = {
    cell: (value1, value2) => value1 + value2,
    context: {
      mapper: {
        viewToColumn: value => value,
      },
    },
  };

  describe('cell', () => {
    it('should return the sum of two numbers', () => {
      const virtualColumn = new VirtualColumn(box, 10);
      expect(virtualColumn.cell(10)).to.equal(20);
    });
  });
});
