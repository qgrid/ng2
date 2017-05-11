import {Model} from './model';

describe('model', () => {

	describe('register', () => {
		it('should register only objects', () => {
			expect(() => Model.register('foo', 1)).to.throw(/not a valid type/);
		});
	});
});