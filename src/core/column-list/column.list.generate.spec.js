import {generate as doGenerate} from '../column-list';
import {columnFactory} from '../column/column.factory';

const createColumn = columnFactory({columnList: () => ({columns: [], reference: {}})});
const generate = (rows) => {
	return rows ? doGenerate({rows, columnFactory: createColumn}) : doGenerate({columnFactory: createColumn});
};

describe('column generate', () => {
	it('should return empty array when input is not defined', () => {
		expect(generate()).to.eql([]);
	});

	it('should return empty array when passed empty array', () => {
		expect(generate([])).to.eql([]);
	});

	it('should return array of columns', () => {
		const rows = [{
			lastName: 'Doe',
			firstName: 'John'
		}];

		const columns = generate(rows);

		expect(columns.length).to.equal(2);
		expect(columns[0].key).to.equal('lastName');
		expect(columns[0].title).to.equal('Last Name');
		expect(columns[1].key).to.equal('firstName');
		expect(columns[1].title).to.equal('First Name');
	});

	it('should handle nested objects', () => {
		const rows = [{
			name: {
				last: 'Doe',
				first: 'John'
			}
		}];

		const columns = generate(rows);

		expect(columns.length).to.equal(2);
		expect(columns[0].key).to.equal('name.last');
		expect(columns[0].title).to.equal('Name Last');
		expect(columns[1].key).to.equal('name.first');
		expect(columns[1].title).to.equal('Name First');
	});

	it('should assign getter by row', () => {
		const rows = [{
			lastName: 'Doe',
			firstName: 'John'
		}, {
			lastName: 'Smith',
			firstName: 'Jeff'
		}];

		const columns = generate(rows);

		expect(columns[0].value(rows[0])).to.equal('Doe');
		expect(columns[1].value(rows[0])).to.equal('John');
		expect(columns[0].value(rows[1])).to.equal('Smith');
		expect(columns[1].value(rows[1])).to.equal('Jeff');
	});

	it('should assign getter for nested object', () => {
		const rows = [{
			lastName: 'Doe',
			firstName: 'John',
			contacts: {
				address: {
					street: 'Lenina',
					zip: '123456'
				}
			}
		}];

		const columns = generate(rows);

		const row = rows[0];
		expect(columns.length).to.equal(4);
		expect(columns[2].key).to.equal('contacts.address.street');
		expect(columns[2].title).to.equal('Contacts Address Street');
		expect(columns[2].value(row)).to.equal('Lenina');
		expect(columns[3].key).to.equal('contacts.address.zip');
		expect(columns[3].title).to.equal('Contacts Address Zip');
		expect(columns[3].value(row)).to.equal('123456');
	});

	it('should assign setter', () => {
		const rows = [{
			lastName: 'Doe',
			firstName: 'John'
		}];

		const columns = generate(rows);
		const lastName = columns[0];
		const row = rows[0];

		expect(lastName.key).to.equal('lastName');
		expect(lastName.title).to.equal('Last Name');
		expect(lastName.value(row)).to.equal('Doe');

		const newValue = 'Johnson';
		lastName.value(row, newValue);
		expect(lastName.value(row)).to.equal(newValue);
	});

	it('should assign setter for nested object', () => {
		const rows = [{
			lastName: 'Doe',
			firstName: 'John',
			contacts: {
				address: {
					street: 'Lenina',
					zip: '123456'
				}
			}
		}];

		const columns = generate(rows);
		const street = columns[2];
		const row = rows[0];

		expect(street.key).to.equal('contacts.address.street');
		expect(street.title).to.equal('Contacts Address Street');
		expect(street.value(row)).to.equal('Lenina');

		const newValue = 'Main';
		street.value(row, newValue);
		expect(street.value(row)).to.equal(newValue);
	});

	it('should assign getter for array', () => {
		const rows = [{
			lastName: 'Doe',
			firstName: 'John',
			likes: ['chatting', 'boxing', 'swimming']
		}];

		const columns = generate(rows);

		const row = rows[0];
		expect(columns.length).to.equal(3);
		expect(columns[2].key).to.equal('likes');
		expect(columns[2].title).to.equal('Likes');
		expect(columns[2].value(row)).to.equal(row.likes);
	});
});