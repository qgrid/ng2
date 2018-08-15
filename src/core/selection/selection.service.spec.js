import {SelectionService} from './selection.service';
import {modelFactory} from '../test/model.factory';

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

describe('selection service', () => {
	before('init model', () => {

		model = modelFactory();

		model.data({
			rows
		});

		model.columnList({
			line: columns
		})
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

		describe('lookup function', () => {
			it('should return rows by keys', () => {
				const service = new SelectionService(model);

				const entries = service.lookup([101, 102]);

				expect(entries.length).to.equal(2);
				expect(entries[0].id).to.equal(101);
				expect(entries[0].name).to.equal('John Doe');
				expect(entries[1].id).to.equal(102);
				expect(entries[1].name).to.equal('David Smith');
			});
		});

		describe('key function', () => {
			it('should return key of corresponding row', () => {
				const service = new SelectionService(model);
				const key = service.keyFactory('row');

				const keys = rows.map(row => key(row));

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
				items: []
			});
		});

		describe('lookup function', () => {
			it('should return columns by keys', () => {
				const service = new SelectionService(model);

				const entries = service.lookup(['name', 'age']);

				expect(entries.length).to.equal(2);
				expect(entries[0].key).to.equal('name');
				expect(entries[1].key).to.equal('age');
			});
		});

		describe('key function', () => {
			it('should return key of corresponding column', () => {
				const service = new SelectionService(model);
				const key = service.keyFactory('column');

				const keys = columns.map(column => key(column));

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
				items: []
			});
		});

		describe('lookup function', () => {
			it('should return cells by keys', () => {
				const service = new SelectionService(model);

				const entries = service.lookup([{
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
				const service = new SelectionService(model);
				const cell = {
					row: rows[1],
					column: columns[1]
				};

				const key = service.hashFactory('cell')(cell);

				expect(key).to.equal('name[102]');
			});
		});
	});
});
