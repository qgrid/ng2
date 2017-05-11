import {filterPipe as filter} from './filter.pipe';

describe('pipe filter', () => {
	it('should return function', () => {
		expect(filter).to.be.a('function');
	});

	it('should pass data to the next stage', (done) => {
		filter(
			[1, 2, 3], {
				model: {
					filter: () => {
						return {match: ctx => item => true}
					}
				}
			},
			(data) => {
				expect(data).to.eql([1, 2, 3]);
				done();
			});
	});
});