import {FakeElement} from '../fake';
import {Selector} from './selector';
import {Bag} from '../bag';
import {UnitFactory} from './unit.factory';
import {Range} from '../../infrastructure/range';

describe('Selector', () => {
	let cells1 = [1,2];
	let cells2 = [];
	let row1 = {cells: [{colSpan: 1}, {colSpan: 2}]};
	let row2 = {cells: []};
	let rowRange = new Range(1,3);
	let columnRange = new Range(1,4);
	let element = {
		rows: [row1, row2]
	};
	let bag = new Bag();
	let bagMap = bag.elements;
	bagMap.set(row1, cells1);
	bagMap.set(row2, cells2);
	let factory = new UnitFactory(rowRange, columnRange);
	let selector = new Selector(element, bag, factory);

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

	describe('findCellFactory', () => {
		it('returns cells[1]', () => {
			let row = {cells: [{colSpan: 1}, {colSpan: 2}]};
			let factory = selector.findCellFactory(1);
			let result = factory(row);
			expect(result).to.equal(row.cells[1]);
		});
		it('returns null if cell wasn`t found', () => {
			let row = {cells: [{colSpan: 1}, {colSpan: 2}]};
			let factory = selector.findCellFactory(2);
			let result = factory(row);
			expect(result).to.equal(null);
		});
	});

	describe('row', () => {
		it('creates row', () => {
			let test = {
				element: {
					cells: [{colSpan: 1}, {colSpan: 2}]
				},
				index: 1
			};
			let result = selector.row(0);
			expect(JSON.stringify(result)).to.equal(JSON.stringify(test));
		});
		it('creates row using FakeElement', () => {
			let test = {
				element: new FakeElement(),
				index: 4
			};
			let result = selector.row(3);
			expect(JSON.stringify(result)).to.equal(JSON.stringify(test));
		});
	});

	describe('cell', () => {
		it('creates cell', () => {
			let test = {
				element: {
					colSpan: 2
				},
				rowIndex: 1,
				columnIndex: 2
			};
			let result = selector.cell(0, 1);
			expect(JSON.stringify(result)).to.equal(JSON.stringify(test));
		});
		it('creates cell using FakeElement', () => {
			let test = {
				element: new FakeElement(),
				rowIndex: 4,
				columnIndex: 4
			};
			let result = selector.cell(3, 3);
			expect(JSON.stringify(result)).to.equal(JSON.stringify(test));
		});
	});

	describe('rowCells', () => {
		it('creates cells', () => {
			let test1 = {
				element: {
					colSpan: 1
				},
				rowIndex: 1,
				columnIndex: 1
			};
			let test2 = {
				element: {
					colSpan: 2
				},
				rowIndex: 1,
				columnIndex: 2
			};
			let result = selector.rowCells(0);
			expect(JSON.stringify(result[0])).to.equal(JSON.stringify(test1));
			expect(JSON.stringify(result[1])).to.equal(JSON.stringify(test2));
		});
		it('returns empty array if row was not found', () => {
			let result = selector.rowCells(3);
			expect(result).to.be.an.instanceOf(Array).and.to.have.lengthOf(0);
		});
	});

	describe('rows', () => {
		it('undefined case', () => {
			let test1 = {
				element: {cells: [{colSpan: 1}, {colSpan: 2}]},
				index: 1
			};
			let test2 = {
				element: {cells: []},
				index: 2
			};
			let result = selector.rows(undefined);
			expect(JSON.stringify(result[0])).to.equal(JSON.stringify(test1));
			expect(JSON.stringify(result[1])).to.equal(JSON.stringify(test2));
		});
		it('rows', () => {
			let test = {
				element: {cells: [{colSpan: 1}, {colSpan: 2}]},
				index: 1
			};
			let result = selector.rows(1);
			expect(JSON.stringify(result[0])).to.equal(JSON.stringify(test));
		});
	});

	describe('rowCount', () => {
		let cells1 = [1,2];
		let cells2 = [];
		let row1 = {cells: [{colSpan: 1, rowSpan: 1}, {colSpan: 2, rowSpan: 2}]};
		let row2 = {cells: []};
		let rowRange = new Range(1,3);
		let columnRange = new Range(1,4);
		let element = {
			rows: [row1, row2]
		};
		let bag = new Bag();
		let bagMap = bag.elements;
		bagMap.set(row1, cells1);
		bagMap.set(row2, cells2);
		let factory = new UnitFactory(rowRange, columnRange);
		let selector = new Selector(element, bag, factory);
		it('returns row count', () => {
			let result = selector.rowCount(1);
			expect(result).to.equal(2);
		});
	});

	describe('rowCount', () => {
		let cells1 = [1,2];
		let cells2 = [];
		let row1 = {cells: [{colSpan: 1, rowSpan: 1}, {colSpan: 2, rowSpan: 2}]};
		let row2 = {cells: []};
		let rowRange = new Range(1,3);
		let columnRange = new Range(1,4);
		let element = {
			rows: [row1, row2]
		};
		let bag = new Bag();
		let bagMap = bag.elements;
		bagMap.set(row1, cells1);
		bagMap.set(row2, cells2);
		let factory = new UnitFactory(rowRange, columnRange);
		let selector = new Selector(element, bag, factory);
		it('returns row number ', () => {
			let result = selector.rowCount(1);
			expect(result).to.equal(2);
		});
	});

	describe('columnCells', () => {
		it('returns cell', () => {
			let test = {
				element: {
					colSpan: 1
				},
				rowIndex: 1,
				columnIndex: 1
			};
			let result = selector.columnCells(0);
			expect(JSON.stringify(result[0])).to.equal(JSON.stringify(test));
		});
	});

});