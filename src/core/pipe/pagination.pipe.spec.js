import { paginationPipe as pagination } from './pagination.pipe';
import { modelFactory } from '../test/model.factory';

describe('pipe pagination', () => {
	let model;

	before(() => {
		model = modelFactory();
		model.pagination({
			current: 1,
			size: 1
		});
	});

	it('should return a function', () => {
		expect(pagination).to.be.a('function');
	});

	it('should pass paginated data to the next stage', (done) => {
		pagination([1, 2, 3], { model },
			data => {
				expect(data).to.eql([2]);
				done();
			});
	});

	it('should pass the whole collection to the next stage in virtual mode', (done) => {
		model.scroll({ mode: 'virtual' });

		pagination([1, 2, 3], { model },
			data => {
				expect(data).to.eql([1, 2, 3]);
				done();
			});
	});
});
