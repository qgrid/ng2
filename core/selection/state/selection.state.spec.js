import {SelectionState} from './selection.state';
import {Model} from '../../infrastructure/model';
import {DataModel} from '../../data/data.model';
import {SelectionModel} from '../../selection/selection.model';

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

describe('selection state', () => {
	before('init model', () => {
		// Model.register('data', DataModel)
		// 	.register('selection', SelectionModel);

		model = new Model();

		model
			.data({
				rows: rows,
				columns: columns
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
				items: [],
				entries: []
			});
		});

		describe('lookup function', () => {
			it('should return rows by keys', () => {
				const selectionState = new SelectionState(model);

				const entries = selectionState.lookup([101, 102]);

				expect(entries.length).to.equal(2);
				expect(entries[0].id).to.equal(101);
				expect(entries[0].name).to.equal('John Doe');
				expect(entries[1].id).to.equal(102);
				expect(entries[1].name).to.equal('David Smith');
			});
		});

		describe('key function', () => {
			it('should return key of corresponding row', () => {
				const selectionState = new SelectionState(model);

				const keys = rows.map(row => selectionState.key(row));

				expect(keys[0]).to.equal(101);
				expect(keys[1]).to.equal(102);
				expect(keys[2]).to.equal(103);
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
				items: [],
				entries: []
			});
		});

		describe('lookup function', () => {
			it('should return columns by keys', () => {
				const selectionState = new SelectionState(model);

				const entries = selectionState.lookup(['name', 'age']);

				expect(entries.length).to.equal(2);
				expect(entries[0].key).to.equal('name');
				expect(entries[1].key).to.equal('age');
			});
		});

		describe('key function', () => {
			it('should return key of corresponding column', () => {
				const selectionState = new SelectionState(model);

				const keys = columns.map(column => selectionState.key(column));

				expect(keys[0]).to.equal('id');
				expect(keys[1]).to.equal('name');
				expect(keys[2]).to.equal('age');
			});
		});
	});

	describe('cell unit', () => {
		before('init model', () => {
			model.selection({
				unit: 'cell',
				key: {
					row: row => row.id,
					column: column => column.key
				}
			});
		});

		beforeEach('reset selection', () => {
			model.selection({
				items: [],
				entries: []
			});
		});

		describe('lookup function', () => {
			it('should return cells by keys', () => {
				const selectionState = new SelectionState(model);

				const entries = selectionState.lookup([{
					row: 102,
					column: 'name'
				}, {
					row: 103,
					column: 'age'
				}]);

				expect(entries.length).to.equal(2);
				expect(entries[0].row.id).to.equal(102);
				expect(entries[0].row.name).to.equal('David Smith');
				expect(entries[0].row.age).to.equal(30);
				expect(entries[0].column.key).to.equal('name');
				expect(entries[1].row.id).to.equal(103);
				expect(entries[1].row.name).to.equal('Lue Laserna');
				expect(entries[1].row.age).to.equal(25);
				expect(entries[1].column.key).to.equal('age');
			});
		});

		describe('key function', () => {
			it('should return stringified key of corresponding cell', () => {
				const selectionState = new SelectionState(model);
				const cell = {
					row: rows[1],
					column: columns[1]
				};

				const key = selectionState.key(cell);

				expect(key).to.equal('name[102]');
			});
		});
	});
});
