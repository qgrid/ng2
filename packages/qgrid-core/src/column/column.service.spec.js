import { findColumn, getCellValue } from './column.service';

describe('column service', () => {
	describe('value', function () {
		it('should return field by key', () => {
			const value = getCellValue({ key: 'name' })({ name: 'John' });
			expect(value).to.be.equal('John');
		});

		it('should return value according to value function', () => {
			const value = getCellValue({ key: 'name', value: row => row.name + ' Jr.' })({ name: 'John' });
			expect(value).to.be.equal('John Jr.');
		});
	});

	describe('find', () => {
		const columns = [
			{
				key: 'name',
			},
			{
				key: 'age',
				title: 'Age',
			},
			{
				key: 'gender',
			},
		];

		it('should return column object', () => {
			expect(findColumn(columns, 'age')).to.be.eqls({ key: 'age', title: 'Age' });
		});

		it('should return null if key is not found', () => {
			expect(findColumn(columns, 'missingKey')).to.equal(null);
		});
	});
});
