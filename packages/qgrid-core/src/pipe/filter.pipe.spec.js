import { modelFactory } from '../test/model.factory';
import { filterPipe as filter } from './filter.pipe';

describe('pipe filter', () => {
	const model = modelFactory();

	it('should return function', () => {
		expect(filter).to.be.a('function');
	});

	it('should pass data to the next stage with match', (done) => {
		model.filter({
			match: (ctx) => (item) => true,
		});
		filter([1, 2, 3], { model }, (data) => {
			expect(data).to.eql([1, 2, 3]);
			done();
		});
	});

	it('should pass data to the next stage with custom', (done) => {
		model.filter({
			custom: (item) => true,
		});
		filter([1, 2, 3], { model }, (data) => {
			expect(data).to.eql([1, 2, 3]);
			done();
		});
	});
});
