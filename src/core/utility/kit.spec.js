import * as Utility from './utility/kit';

describe('kit', () => {
	describe('isObject', () => {
		it('should return false when passing number', () => {
			expect(Utility.isObject(12)).to.be.false;
		});

		it('should return true when passing empty object', () => {
			expect(Utility.isObject({})).to.be.true;
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
		let foo = Utility.noop();
		it('should check whether the noop function returns nothing', () => {
			expect(foo).to.equal(undefined);
		});
	});

	describe('yes', () => {
		let foo = Utility.yes();
		it('should check whether the yes function returns true', () => {
			expect(foo).to.equal(true);
		});
	});

	describe('no', () => {
		let foo = Utility.no();
		it('should check whether the no function returns false', () => {
			expect(foo).to.equal(false);
		});
	});

	describe('identity', () => {
		let foo = Utility.identity(123);
		it('should check whether the identity function returns its argument', () => {
			expect(foo).to.equal(123);
		});
	});

	describe('toCamelCase', () => {
		it('should return empty string if passed one argument ', () => {
			let foo = Utility.toCamelCase('camel');
			expect(foo).to.equal('camel');
		});
		it('should return string transformed into camelCase', () => {
			let foo = Utility.toCamelCase('camel', 'case');
			expect(foo).to.equal('camelCase');
		});
		it('should return string transformed into camelCase', () => {
			let foo = Utility.toCamelCase('Camel', 'case');
			expect(foo).to.equal('CamelCase');
		});
		it('should return string transformed into camelCase', () => {
			let foo = Utility.toCamelCase('Camel', 'Case');
			expect(foo).to.equal('CamelCase');
		});
		it('should return string transformed into camelCase', () => {
			let foo = Utility.toCamelCase('CAMEL', 'Case');
			expect(foo).to.equal('CAMELCase');
		});
		it('should return string transformed into camelCase', () => {
			let foo = Utility.toCamelCase('CAMEL', 'CASE');
			expect(foo).to.equal('CAMELCASE');
		});
		it('should return string transformed into camelCase', () => {
			let foo = Utility.toCamelCase('camel', 'CASE');
			expect(foo).to.equal('camelCASE');
		});
		it('should return string transformed into camelCase if passed many arguments', () => {
			let foo = Utility.toCamelCase('camel', 'case', 'is', 'not', 'a', 'pascal', 'case');
			expect(foo).to.equal('camelCaseIsNotAPascalCase');
		});
		it('should return string transformed into camelCase if passed many arguments with Upper case chars', () => {
			let foo = Utility.toCamelCase('columnList', 'generation');
			expect(foo).to.equal('columnListGeneration');
		});
		it('should return empty string', () => {
			let foo = Utility.toCamelCase();
			expect(foo).to.equal('');
		});
	});

	describe('isEmail', () => {
		it('should validate an email address', () => {
			let foo = Utility.isEmail('1email1@gmail.com');
			expect(foo).to.equal(true);
		});
		it('should return false if passed incorrect email', () => {
			let foo = Utility.isEmail('@email.com');
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			let foo = Utility.isEmail(123);
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			let foo = Utility.isEmail();
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			let foo = Utility.isEmail(false);
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			let foo = Utility.isEmail(true);
			expect(foo).to.equal(false);
		});
		it('should return false if passed incorrect email', () => {
			let foo = Utility.isEmail(undefined);
			expect(foo).to.equal(false);
		});
	});
});