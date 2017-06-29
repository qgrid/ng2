import {isObject, startCase} from './utility';

describe('utility', () => {
	describe('isObject', () => {
		it('should return false when passing number', () => {
			expect(isObject(12)).to.be.false;
		});

		it('should return true when passing empty object', () => {
			expect(isObject({})).to.be.true;
		});
	});

	describe('startCase', () => {
		it('should return prettified string from camel case', () => {
			const camel = 'lastName';
			expect(startCase(camel)).to.equal('Last Name');
		});

		it('should return prettified string from dot case', () => {
			const dotted = 'last.name';
			expect(startCase(dotted)).to.equal('Last Name');
		});

		it('should return capitalized abbreviation', () => {
			const withAbbr = 'userTIN';
			expect(startCase(withAbbr)).to.equal('User TIN');
		});
	});
});