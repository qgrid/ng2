import {UnitFactory} from './unit.factory';
import {Range} from '../../infrastructure/range';

describe('UnitFactory', () => {
	let element = 'div';
	let rowIndex = 2;
	let columnIndex = 3;
	let rowRange = new Range(1,3);
	let columnRange = new Range(1,4);
	let unitFactory = new UnitFactory(rowRange, columnRange);
	let cellResult = {
		element: 'div',
		rowIndex: 3,
		columnIndex: 4
	};
	let rowResult = {
		element: 'div',
		index: 3
	};

	describe('cell', () => {
		it('returns cell', () => {
			let result = unitFactory.cell(element, rowIndex, columnIndex);
			expect(JSON.stringify(result)).to.equal(JSON.stringify(cellResult));
		});
	});

	describe('row', () => {
		it('returns row', () => {
			let result = unitFactory.row(element, rowIndex);
			expect(JSON.stringify(result)).to.equal(JSON.stringify(rowResult));
		});
	});
});
