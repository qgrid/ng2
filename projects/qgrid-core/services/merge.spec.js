import * as Merge from './merge';

describe('merge.service', () => {

	const settings = {};
	const foo = Merge.merge(settings);

	it('should return number of items of property updated and set values to result array', () => {
		let left = [1, 2, 3];
		let right = [1, 2, 3, 40, 50, 60, 70, 80];
		let result = [];
		const resultObject = foo(left, right, result);

		expect(resultObject.updated).to.equal(3);
		expect(JSON.stringify(result)).to.equal('[40,50,60,70,80]');
	});

	it('should return number of items of property inserted and set values to result array', () => {
		let left = [1];
		let right = [1, 2, 3, 4, 5, 6];
		let result = [];
		const resultObject = foo(left, right, result);

		expect(resultObject.inserted).to.equal(5);
		expect(JSON.stringify(result)).to.equal('[2,3,4,5,6]');
	});

	it('should return number of items of property removed', () => {
		let left = [1, 2, 3, 4, 5, 6];
		let right = [1];
		let result = [];
		const resultObject = foo(left, right, result);

		expect(resultObject.removed).to.equal(5);
		expect(JSON.stringify(result)).to.equal('[]');
	});
});
