import { filterPipe as filter } from './filter.pipe';
import { modelFactory } from '../test/model.factory';

describe('pipe filter', () => {
	let model = modelFactory();

	it('should return function', () => {
		expect(filter).to.be.a('function');
	});

	it('should pass data to the next stage', (done) => {
		model.filter({
			match: ctx => item => true
		})
		filter([1, 2, 3], { model },
			data => {
				expect(data).to.eql([1, 2, 3]);
				done();
			});
	});
});
