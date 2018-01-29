import {CellSelector} from './cell.selector';
import {modelFactory} from '../test/model.factory';

describe('CellSelector', function () {
	let model;

	beforeEach(function() {
		model = modelFactory();
	});

	let tableForRow = {
		data: {
			rows: () => ['Item1', 'Item2', 'Item3']
		},
		body: {
			row: (index) => {
				switch(index) {
					case 0: return {cells: () => ['Row1', 'Row2']};
					case 1: return {cells: () => ['Row3', 'Row4']};
					case 2: return {cells: () => ['Row5', 'Row6']};
				}
			}
		}
	};

	let tableForColumn = {
		data: {
			columns: () => ['Item1', 'Item2', 'Item3']
		},
		body: {
			column: (index) => {
				switch(index) {
					case 0: return {cells: () => ['Column1']};
					case 1: return {cells: () => ['Column2']};
					case 2: return {cells: () => ['Column3']};
				}
			}
		}
	};

	let tableForCell = {
		data: {
			columns: () => ['Column1', 'Column2', 'Column3'],
			rows: () => ['Row1', 'Row2', 'Row3']
		},
		body: {
			cell: (rowIndex, columnIndex) => {return tableForCell.data.columns()[columnIndex]
																+ ' ' + tableForCell.data.rows()[rowIndex];}
		}
	};

	let tableForMix = {
		data: {
			columns: () => ['Column1', 'Column2', 'Column3'],
			rows: () => ['Row1', 'Row2', 'Row3']
		},
		body: {
			row: (index) => {
				switch(index) {
					case 0: return {cells: () => ['Row1']};
					case 1: return {cells: () => ['Row2']};
					case 2: return {cells: () => ['Row3']};
				}
			},
			cell: (rowIndex, columnIndex) => {return tableForMix.data.columns()[columnIndex]
				+ ' ' + tableForMix.data.rows()[rowIndex];}
		}
	};

	describe('map/mapFromRows', function () {
		it('should return array of Cells', () => {
			model.selection({
				unit: 'row'
			});
			let cellSelector = new CellSelector(model, tableForRow);
			let items = ['Item1', 'Item2', 'Item3'];
			let result = cellSelector.map(items);
			expect(JSON.stringify(result)).to.equal('["Row1","Row2","Row3","Row4","Row5","Row6"]');
		});
	});

	describe('map/mapFromColumns', function () {
		it('should return array of Columns', () => {
			model.selection({
				unit: 'column'
			});
			let cellSelector = new CellSelector(model, tableForColumn);
			let items = ['Item1', 'Item2', 'Item3'];
			let result = cellSelector.map(items);
			expect(JSON.stringify(result)).to.equal('["Column1","Column2","Column3"]');
		});
	});

	describe('map/mapFromCells', function () {
		it('should return ["Column1 Row1"]', () => {
			model.selection({
				unit: 'cell'
			});
			let item = {
				row: 'Row1',
				column: 'Column1'
			};
			let cellSelector = new CellSelector(model, tableForCell);
			let items = [item];
			let result = cellSelector.map(items);
			expect(JSON.stringify(result)).to.equal('["Column1 Row1"]');
		});
	});

	describe('map/mapFromMix', function () {
		it('should return array from mixed objects', () => {
			model.selection({
				unit: 'mix'
			});
			let row = {
				unit: 'row',
				item: 'Row1'
			};
			let cell = {
				unit: 'cell',
				item: {
					row: 'Row1',
					column: 'Column1'
				}
			};
			let items = [row, cell];
			let cellSelector = new CellSelector(model, tableForMix);
			let result = cellSelector.map(items);
			expect(JSON.stringify(result)).to.equal('["Row1","Column1 Row1"]');
		});
	});

	describe('exception', function () {
		it('should throw an exception if selectionState.unit != row/column/cell/mix', () => {
			model.selection({
				unit: 'false'
			});
			let cellSelector = new CellSelector(model, {});
			expect(() => cellSelector.map({})).to.throw;
		});
	});

});
