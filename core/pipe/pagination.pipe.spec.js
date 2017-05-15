import {paginationPipe as pagination} from './pagination.pipe';

describe('pipe pagination', () => {
	it('should return a function', () => {
		expect(pagination).to.be.a('function');
	});

	it('should pass paginated data to the next stage', (done) => {
		pagination(
			[1, 2, 3], {
				model: {
					pagination: () => {
						return {
							current: 1,
							size: 1
						}
					},
					scroll: () => new Object()
				}
			},
			(data) => {
				expect(data).to.eql([2]);
				done();
			});
	});

	it('should pass the whole collection to the next stage in virtual mode', (done) => {
		pagination(
			[1, 2, 3], {
				model: {
					pagination: () => {
						return {
							current: 1,
							size: 1
						}
					},
					scroll: () => {
						return {mode: 'virtual'};
					}
				}
			},
			(data) => {
				expect(data).to.eql([1, 2, 3]);
				done();
			});
	});
});