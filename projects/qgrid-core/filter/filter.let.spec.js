import { FilterLet } from './filter.let';

describe('FilterLet', () => {
	let model = {
		filter: () => { return { by: { 'Key': null } } }
	};

	describe('has', () => {
		it('should return true if model contains the given column`s key', () => {
			let columnTest = {
				key: 'Key'
			};
			let filterView = new FilterLet(model);
			let result = filterView.has(columnTest);
			expect(result).to.equal(true);
		});

		it('should return false if model does not contains the given column`s key', () => {
			let columnTest = {
				key: null
			};
			let filterView = new FilterLet(model);
			let result = filterView.has(columnTest);
			expect(result).to.equal(false);
		});
	});
});
