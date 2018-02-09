import {MultipleSelectionState} from './multiple.selection.state';
import {SelectionService} from '../selection.service';
import {modelFactory} from '../../test/model.factory';

let model;
const rows = [{
	'id': 101,
	'name': 'John Doe',
	'age': 34
}, {
	'id': 102,
	'name': 'David Smith',
	'age': 30
}, {
	'id': 103,
	'name': 'Lue Laserna',
	'age': 25
}];

const columns = [{
	key: 'id'
}, {
	key: 'name'
}, {
	key: 'age'
}];

describe('multiple selection state', () => {
	before('init model', () => {0

		model = modelFactory();

		model
			.data({
				rows,
				columns
			})
			.selection({
				mode: 'multiple'
			});
	});

	describe('row unit', () => {
		before('init model', () => {
			model.selection({
				unit: 'row',
				key: {
					row: row => row.id
				}
			});
		});

		beforeEach('reset selection', () => {
			model.selection({
				items: []
			});
		});

		describe('select function', () => {
			it('should be able to select multiple rows', () => {
				const selectionState = new MultipleSelectionState(model, new SelectionService(model));

				selectionState.select([rows[0], rows[2]]);

				const entries = selectionState.entries();
				expect(entries.length).to.equal(2);
				expect(entries[0].id).to.equal(101);
				expect(entries[0].name).to.equal('John Doe');
				expect(entries[1].id).to.equal(103);
				expect(entries[1].name).to.equal('Lue Laserna');
			});
		});

		describe('state function', () => {
			it('should return state of row', () => {
				const selectionState = new MultipleSelectionState(model, new SelectionService(model));
				selectionState.select([rows[0], rows[1]]);

				const states = rows.map(row => selectionState.state(row));

				expect(states[0]).to.be.true;
				expect(states[1]).to.be.true;
				expect(states[2]).to.be.false;
			});
		});
	});

	describe('column unit', () => {
		before('init model', () => {
			model.selection({
				unit: 'column',
				key: {
					column: column => column.key
				}
			});
		});

		beforeEach('reset selection', () => {
			model.selection({
				items: []
			});
		});

		describe('select function', () => {
			it('should be able to select multiple columns', () => {
				const selectionState = new MultipleSelectionState(model, new SelectionService(model));

				selectionState.select([columns[0], columns[2]]);

				const entries = selectionState.entries();
				expect(entries.length).to.equal(2);
				expect(entries[0].key).to.equal('id');
				expect(entries[1].key).to.equal('age');
			});
		});

		describe('state function', () => {
			it('should return state of column', () => {
				const selectionState = new MultipleSelectionState(model, new SelectionService(model));
				selectionState.select([columns[0], columns[1]]);

				const states = columns.map(col => selectionState.state(col));

				expect(states[0]).to.be.true;
				expect(states[1]).to.be.true;
				expect(states[2]).to.be.false;
			});
		});
	});

	describe('cell unit', () => {
		let cells = [];

		before('init model', () => {
			model.selection({
				unit: 'cell',
				key: {
					row: row => row.id,
					column: column => column.key
				}
			});
		});

		before('prepare array of cells', () => {
			rows.forEach(row => {
				columns.forEach(column => {
					cells.push({
						row,
						column
					});
				});
			});
		});

		beforeEach('reset selection', () => {
			model.selection({
				items: []
			});
		});

		describe('select function', () => {
			it('should be able to select multiple columns', () => {
				const selectionState = new MultipleSelectionState(model, new SelectionService(model));
				selectionState.select([
					cells[0],
					cells[cells.length-1]
				]);

				const entries = selectionState.entries();

				expect(entries.length).to.equal(2);
				expect(entries[0].row.id).to.equal(101);
				expect(entries[0].row.name).to.equal('John Doe');
				expect(entries[0].row.age).to.equal(34);
				expect(entries[0].column.key).to.equal('id');
				expect(entries[1].row.id).to.equal(103);
				expect(entries[1].row.name).to.equal('Lue Laserna');
				expect(entries[1].row.age).to.equal(25);
				expect(entries[1].column.key).to.equal('age');
			});
		});

		describe('state function', () => {
			it('should return state of cell', () => {
				const selectionState = new MultipleSelectionState(model, new SelectionService(model));
				const last = cells.length-1;
				selectionState.select([
					cells[0],
					cells[last]
				]);

				const states = cells.map(cell => selectionState.state(cell));

				expect(states[0]).to.be.true;
				expect(states[last]).to.be.true;
			});
		});
	});
});