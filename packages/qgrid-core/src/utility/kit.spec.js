import * as Utility from './kit';

describe('kit', () => {
	describe('isObject', () => {
		it('should return false when passing number', () => {
			expect(Utility.isObject(12)).to.be.false();
		});

		it('should return true when passing empty object', () => {
			expect(Utility.isObject({})).to.be.true();
		});
	});

	describe('startCase', () => {
		it('should return prettified string from camel case', () => {
			const camel = 'lastName';
			expect(Utility.startCase(camel)).to.equal('Last Name');
		});

		it('should return prettified string from dot case', () => {
			const dotted = 'last.name';
			expect(Utility.startCase(dotted)).to.equal('Last Name');
		});

		it('should return capitalized abbreviation', () => {
			const withAbbr = 'userTIN';
			expect(Utility.startCase(withAbbr)).to.equal('User TIN');
		});
	});

	describe('noop', () => {
		const foo = Utility.noop();
		it('should check whether the noop function returns nothing', () => {
			expect(foo).to.equal(undefined);
		});
	});

	describe('yes', () => {
		const foo = Utility.yes();
		it('should check whether the yes function returns true', () => {
			expect(foo).to.equal(true);
		});
	});

	describe('no', () => {
		const foo = Utility.no();
		it('should check whether the no function returns false', () => {
			expect(foo).to.equal(false);
		});
	});

	describe('identity', () => {
		const foo = Utility.identity(123);
		it('should check whether the identity function returns its argument', () => {
			expect(foo).to.equal(123);
		});
	});

	describe('toCamelCase', () => {
		it('should return empty string if passed one argument ', () => {
			const foo = Utility.toCamelCase('camel');
			expect(foo).to.equal('camel');
		});
		it('should return string transformed into camelCase', () => {
			const foo = Utility.toCamelCase('camel', 'case');
			expect(foo).to.equal('camelCase');
		});
		it('should return string transformed into camelCase', () => {
			const foo = Utility.toCamelCase('Camel', 'case');
			expect(foo).to.equal('CamelCase');
		});
		it('should return string transformed into camelCase', () => {
			const foo = Utility.toCamelCase('Camel', 'Case');
			expect(foo).to.equal('CamelCase');
		});
		it('should return string transformed into camelCase', () => {
			const foo = Utility.toCamelCase('CAMEL', 'Case');
			expect(foo).to.equal('CAMELCase');
		});
		it('should return string transformed into camelCase', () => {
			const foo = Utility.toCamelCase('CAMEL', 'CASE');
			expect(foo).to.equal('CAMELCASE');
		});
		it('should return string transformed into camelCase', () => {
			const foo = Utility.toCamelCase('camel', 'CASE');
			expect(foo).to.equal('camelCASE');
		});
		it('should return string transformed into camelCase if passed many arguments', () => {
			const foo = Utility.toCamelCase('camel', 'case', 'is', 'not', 'a', 'pascal', 'case');
			expect(foo).to.equal('camelCaseIsNotAPascalCase');
		});
		it('should return string transformed into camelCase if passed many arguments with Upper case chars', () => {
			const foo = Utility.toCamelCase('columnList', 'generation');
			expect(foo).to.equal('columnListGeneration');
		});
		it('should return empty string', () => {
			const foo = Utility.toCamelCase();
			expect(foo).to.equal('');
		});
	});

	describe('isEmail', () => {
		it('should validate an email address', () => {
			const foo = Utility.isEmail('1email1@gmail.com');
			expect(foo).to.equal(true);
		});
		it('should return false if passed incorrect email', () => {
			const foo = Utility.isEmail('@email.com');
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			const foo = Utility.isEmail(123);
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			const foo = Utility.isEmail();
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			const foo = Utility.isEmail(false);
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			const foo = Utility.isEmail(true);
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			const foo = Utility.isEmail(undefined);
			expect(foo).to.equal(false);
		});
	});

	describe('compare', () => {
		it('should return 0 for equal values', () => {
			const numbers = Utility.compare(0, 0);
			expect(numbers).to.equal(0);

			const strings = Utility.compare('string', 'string');
			expect(strings).to.equal(0);

			const nulls = Utility.compare(null, null);
			expect(nulls).to.equal(0);

			const undefineds = Utility.compare(undefined, undefined);
			expect(undefineds).to.equal(0);
		});

		it('should return 1 if first value is null, undefined, empty string', () => {
			const n = Utility.compare(null, 0);
			expect(n).to.equal(1);

			const u = Utility.compare(undefined, 0);
			expect(u).to.equal(1);

			const e = Utility.compare('', 0);
			expect(e).to.equal(1);
		});

		it('should return -1 if second value is null, undefined, empty string', () => {
			const n = Utility.compare(0, null);
			expect(n).to.equal(-1);

			const u = Utility.compare(0, undefined);
			expect(u).to.equal(-1);

			const e = Utility.compare(10, '');
			expect(e).to.equal(-1);
		});

		it('should return 1 if first value is greater than second', () => {
			const strings = Utility.compare('colorless', 'black-brown');
			expect(strings).to.equal(1);

			const numbers = Utility.compare(350, 250);
			expect(numbers).to.equal(1);
		});

		it('should return -1 if second value is greater than first', () => {
			const strings = Utility.compare('black-brown', 'colorless');
			expect(strings).to.equal(-1);

			const numbers = Utility.compare(250, 350);
			expect(numbers).to.equal(-1);
		});
	});
});
