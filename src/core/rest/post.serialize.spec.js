import {Model} from '../../core/infrastructure';
import {serialize} from './post.serialize';

describe('Model serialization to post parameters', () => {
	describe('pagination', () => {
		it('should set skip/take values', () => {
			const model = new Model().pagination({
				current: 2,
				size: 50
			});
			const params = serialize(model);
			expect(params.skip).to.be.equal(100);
			expect(params.take).to.be.equal(50);
		});
	});

	describe('sorting', () => {
		it('should map ascending order to "+"', () => {
			const model = new Model().sort({
				by: [{lastName: 'asc'}]
			});
			const params = serialize(model);
			expect(params.order).to.be.deep.equal(['+lastName']);
		});

		it('should map descending order to "-"', () => {
			const model = new Model().sort({
				by: [{lastName: 'desc'}]
			});
			const params = serialize(model);
			expect(params.order).to.be.deep.equal(['-lastName']);
		});

		it('should map sorting with correct order', () => {
			const model = new Model().sort({
				by: [{firstName: 'asc'}, {lastName: 'desc'}]
			});
			const params = serialize(model);
			expect(params.order).to.be.deep.equal(['+firstName', '-lastName']);
		});
	});

	describe('filtering', () => {
		it('should map filter by directly', () => {
			const model = new Model().filter({
				by: {
					lastName: ['Doe']
				}
			});
			const params = serialize(model);
			expect(params.filter).to.be.deep.equal({lastName: ['Doe']});
		});
	});
});
