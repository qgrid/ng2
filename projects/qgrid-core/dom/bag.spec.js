import { Bag } from './bag';

describe('Bag', () => {

	afterEach(function () {
		bag.elements.clear();
		bag.rows.clear();
		bag.cells.clear();
	});

	let row = { element: 'row' };
	let cell = { element: 'cell' };
	let bag = new Bag();

	describe('addRow', () => {
		it('returns true if row was added', () => {
			bag.addRow(row);
			let result = bag.elements.has('row') && bag.rows.has(row);
			expect(result).to.equal(true);
		});
	});

	describe('addCell', () => {
		it('returns true if cell was added', () => {
			bag.addCell(cell);
			let result = bag.elements.has('cell') && bag.cells.has(cell);
			expect(result).to.equal(true);
		});
	});

	describe('findModel', () => {
		it('returns true if model was found', () => {
			bag.addCell(cell);
			let model = bag.findModel('cell');
			let result = model.element === 'cell';
			expect(result).to.equal(true);
		});
	});

	describe('hasModel', () => {
		it('returns true if model was found', () => {
			bag.addCell(cell);
			let model = bag.hasModel('cell');
			expect(model).to.equal(true);
		});
	});

	describe('deleteCell', () => {
		it('returns true if Cell was deleted', () => {
			bag.addCell(cell);
			bag.deleteCell(cell);
			let result = bag.elements.has('cell') && bag.cells.has(cell);
			expect(result).to.equal(false);
		});
	});

	describe('deleteRow', () => {
		it('returns false since Row was deleted', () => {
			bag.addRow(row);
			bag.deleteRow(row);
			let result = bag.elements.has('row') && bag.rows.has(row);
			expect(result).to.equal(false);
		});
	});
});

