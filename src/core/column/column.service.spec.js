import { getValue, find } from './column.service';

describe('column service', () => {
	describe('value', function () {
		it('should return field by key', () => {
			let value = getValue({ key: 'name' })({ name: 'John' });
			expect(value).to.be.equal('John');
		});

		it('should return value according to value function', () => {
			let value = getValue({ key: 'name', value: row => row.name + ' Jr.' })({ name: 'John' });
			expect(value).to.be.equal('John Jr.');
		});
	});

	describe('find', () => {
		const columns = [
			{
				key: 'name'
			},
			{
				key: 'age',
				title: 'Age'
			},
			{
				key: 'gender'
			}
		];

		it('should return column object', () => {
			expect(find(columns, 'age')).to.be.eqls({ key: 'age', title: 'Age' });
		});

		it('should return null if key is not found', () => {
			expect(find(columns, 'missingKey')).to.be.null;
		});
	});
});