import { modelFactory } from '../test/model.factory';
import { serializeGet } from './get.serialize';

describe('Model serialization to post parameters', () => {
	describe('pagination', () => {
		it('should set skip/take values', () => {
			const model = modelFactory().pagination({
				current: 2,
				size: 50,
			});
			const params = serializeGet(model);
			expect(params.skip).to.be.equal(100);
			expect(params.take).to.be.equal(50);
		});
	});

	describe('sorting', () => {
		it('should map ascending order to "+"', () => {
			const model = modelFactory().sort({
				by: [ { lastName: 'asc' } ],
			});
			const params = serializeGet(model);
			expect(params.order).to.be.equal('+lastName');
		});

		it('should map descending order to "-"', () => {
			const model = modelFactory().sort({
				by: [ { lastName: 'desc' } ],
			});
			const params = serializeGet(model);
			expect(params.order).to.be.equal('-lastName');
		});

		it('should map sorting with correct order', () => {
			const model = modelFactory().sort({
				by: [ { firstName: 'asc' }, { lastName: 'desc' } ],
			});
			const params = serializeGet(model);
			expect(params.order).to.be.equal('+firstName,-lastName');
		});
	});

	describe('filtering', () => {
		it('should map filter by directly', () => {
			const model = modelFactory().filter({
				by: {
					lastName: { items: ['Doe'] },
				},
			});
			const params = serializeGet(model);
			expect(params.filter).to.be.equal('lastName=in:Doe');
		});
	});
});
