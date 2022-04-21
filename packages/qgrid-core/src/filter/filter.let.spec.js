import { FilterLet } from './filter.let';

describe('FilterLet', () => {
	const model = {
		filter: () => { return { by: { 'Key': null } }; }
	};

	describe('has', () => {
		it('should return true if model contains the given column`s key', () => {
			const columnTest = {
				key: 'Key'
			};
			const filterView = new FilterLet({ model });
			const result = filterView.has(columnTest);
			expect(result).to.equal(true);
		});

		it('should return false if model does not contains the given column`s key', () => {
			const columnTest = {
				key: null
			};
			const filterView = new FilterLet({ model });
			const result = filterView.has(columnTest);
			expect(result).to.equal(false);
		});
	});
});
