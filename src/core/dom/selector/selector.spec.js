import { FakeElement } from '../fake/element';
import { Selector } from './selector';
import { Bag } from '../bag';
import { UnitFactory } from './unit.factory';
import { Range } from '../../infrastructure/range';

describe('Selector', () => {
	let row1 = [{
		colSpan: 1
	}, {
		colSpan: 2
	}];
	row1.forEach(td => td.parentElement = row1);
	let row2 = [];
	let rowRange = new Range(1, 3);
	let columnRange = new Range(1, 4);
	let matrix = [row1, row2];
	let bag = new Bag();
	bag.addRow({
		element: row1,
		model: [1,2],
		index: 0
	});
	bag.addRow({
		element: row2,
		model: [],
		index: 1
	});
	let factory = new UnitFactory(rowRange, columnRange);
	let selector = new Selector(matrix, bag, factory);

	describe('columnCount', () => {
		it('returns row cells', () => {
			let result = selector.columnCount(0);
			expect(result).to.equal(2);
		});
		it('returns 0 if row wasn`t found', () => {
			let result = selector.columnCount(2);
			expect(result).to.equal(0);
		});
	});

	describe('row', () => {
		it('creates row', () => {
			let test = {
				element: row1,
				index: 1
			};

			let result = selector.row(0);

			expect(result).to.eql(test);
		});
		it('creates row using FakeElement', () => {
			let test = {
				element: new FakeElement(),
				index: 4
			};

			let result = selector.row(3);

			expect(result).to.eql(test);
		});
	});

	describe('cell', () => {
		it('creates cell', () => {
			let test = {
				element: row1[1],
				rowIndex: 1,
				columnIndex: 2
			};

			let result = selector.cell(0, 1);

			expect(result).to.eql(test);
		});
		it('creates cell using FakeElement', () => {
			let test = {
				element: new FakeElement(),
				rowIndex: 4,
				columnIndex: 4
			};

			let result = selector.cell(3, 3);

			expect(result).to.eql(test);
		});
	});

	describe('rowCells', () => {
		it('creates cells', () => {
			let test1 = {
				element: row1[0],
				rowIndex: 1,
				columnIndex: 1
			};
			let test2 = {
				element: row1[1],
				rowIndex: 1,
				columnIndex: 2
			};

			let result = selector.rowCells(0);

			expect(result[0]).to.eql(test1);
			expect(result[1]).to.eql(test2);
		});
		it('returns empty array if row was not found', () => {
			let result = selector.rowCells(3);
			expect(result)
				.to.be.an.instanceOf(Array)
				.and.to.have.lengthOf(0);
		});
	});

	describe('rows', () => {
		it('undefined case', () => {
			let test1 = {
				element: row1,
				index: 1
			};
			let test2 = {
				element: row2,
				index: 2
			};

			let result = selector.rows(undefined);

			expect(result[0]).to.eql(test1);
			expect(result[1]).to.eql(test2);
		});

		it('rows', () => {
			let test = {
				element: row1,
				index: 1
			};

			let result = selector.rows(1);

			expect(result[0]).to.eql(test);
		});
	});

	describe('rowCount', () => {
		let td0 = { colSpan: 1, rowSpan: 1 };
		let td1 = { colSpan: 2, rowSpan: 2 };
		let row1 = [td0, td1];
		let row2 = [];
		let rowRange = new Range(1, 3);
		let columnRange = new Range(1, 4);
		let matrix = [[td0, td1],
	                  [null, td1]];
		let bag = new Bag();
		bag.addRow(row1);
		bag.addRow(row2);
		let factory = new UnitFactory(rowRange, columnRange);
		let selector = new Selector(matrix, bag, factory);

		it('returns row number', () => {
			let result = selector.rowCount(1);
			expect(result).to.equal(1);
		});
	});

	describe('columnCells', () => {
		it('returns cell', () => {
			let test = {
				element: row1[0],
				rowIndex: 1,
				columnIndex: 1
			};

			let result = selector.columnCells(0);

			expect(result[0]).to.eql(test);
		});
	});
});
