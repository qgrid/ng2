import { serialize } from './get.serialize';
import { modelFactory } from '../test/model.factory';
import { expect } from 'chai';

describe('Model serialization to post parameters', () => {
	describe('pagination', () => {
		it('should set skip/take values', () => {
			const model = modelFactory().pagination({
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
			const model = modelFactory().sort({
				by: [{ lastName: 'asc' }]
			});
			const params = serialize(model);
			expect(params.order).to.be.equal('+lastName');
		});

		it('should map descending order to "-"', () => {
			const model = modelFactory().sort({
				by: [{ lastName: 'desc' }]
			});
			const params = serialize(model);
			expect(params.order).to.be.equal('-lastName');
		});

		it('should map sorting to comma-separated string', () => {
			const model = modelFactory().sort({
				by: [{ firstName: 'asc' }, { lastName: 'desc' }]
			});
			const params = serialize(model);
			expect(params.order).to.be.equal('+firstName,-lastName');
		});
	});

	describe('filtering', () => {
		it('should be empty string in case of empty filter', () => {
			const model = modelFactory().filter({
				by: {}
			});
			const params = serialize(model);
			expect(params.filter).to.be.equal('');
		});

		it('should map filter to in operation', () => {
			const model = modelFactory().filter({
				by: {
					lastName: { items: ['Doe'] }
				}
			});
			const params = serialize(model);
			expect(params.filter).to.be.equal('lastName=in:Doe');
		});

		it('should join parameters with comma', () => {
			const model = modelFactory().filter({
				by: {
					lastName: {
						items: ['Doe', 'Jones']
					}
				}
			});
			const params = serialize(model);
			expect(params.filter).to.be.equal('lastName=in:Doe,Jones');
		});

		it('should join fields with ;', () => {
			const model = modelFactory().filter({
				by: {
					lastName: { items: ['Doe', 'Jones'] },
					firstName: { items: ['John', 'Harry'] }
				}
			});
			const params = serialize(model);
			expect(params.filter).to.be.equal(
				'lastName=in:Doe,Jones;firstName=in:John,Harry'
			);
		});
	});
});
