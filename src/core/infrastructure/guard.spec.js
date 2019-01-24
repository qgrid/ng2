import {Guard} from './guard';

describe('Guard', () => {

	const test = {
		value: 'value',
		null: null,
		empty: '',
		notFunction: 'text'
	};

	describe('notUndefined', () => {

		it('should throw an exception if value is undefined', () => {
			expect(() => Guard.notUndefined(test.param4, 'name')).to.throw('guard.notUndefined');
		});

	});

	describe('notNull', () => {

		it('should throw an exception if value is undefined', () => {
			expect(() => Guard.notNull(test.param4, 'name')).to.throw('guard.notNull');
		});

		it('should throw an exception if value is null', () => {
			expect(() => Guard.notNull(test.null, 'name')).to.throw('guard.notNull');
		});

	});

	describe('notNullOrEmpty', () => {

		it('should throw an exception if value is undefined', () => {
			expect(() => Guard.notNullOrEmpty(test.param4, 'name')).to.throw('guard.notNullOrEmpty');
		});

		it('should throw an exception if value is null', () => {
			expect(() => Guard.notNullOrEmpty(test.null, 'name')).to.throw('guard.notNullOrEmpty');
		});

		it('should throw an exception if value is empty', () => {
			expect(() => Guard.notNullOrEmpty(test.empty, 'name')).to.throw('guard.notNullOrEmpty');
		});

	});

	describe('invokable', () => {

		it('should throw an exception if value is not a function', () => {
			expect(() => Guard.invokable(test.notFunction, 'name')).to.throw('guard.invokable');
		});

	});
});