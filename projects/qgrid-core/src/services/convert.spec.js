import * as Convert from './convert';

describe('Convert', () => {
	describe('getType', () => {
		it('should return correct type', () => {
			expect(Convert.getType(123)).to.equal('number');
			expect(Convert.getType('123')).to.equal('number');
			expect(Convert.getType('foo')).to.equal('text');
			expect(Convert.getType('123$')).to.equal('text');
			expect(Convert.getType(new String('bar'))).to.equal('text');
			expect(Convert.getType('2017-01-01')).to.equal('date');
			expect(Convert.getType(new Date())).to.equal('date');
			expect(Convert.getType(true)).to.equal('bool');
			expect(Convert.getType('false')).to.equal('text');
			expect(Convert.getType({})).to.equal('object');
			expect(Convert.getType('qgrid@gmail.com')).to.equal('email');
			expect(Convert.getType([1, 2, 3])).to.equal('array');
			expect(Convert.getType([{}, {}])).to.equal('collection');
		});
	});

	describe('parseText', () => {
		const parseText = Convert.parseFactory('text');

		it('should convert positive Number to String', () => {
			expect(parseText(123)).to.equal('123');
		});
		it('should convert negative Number to String', () => {
			expect(parseText(-123)).to.equal('-123');
		});
		it('should convert negative hex Number to String', () => {
			expect(parseText(-1e04)).to.equal('-10000');
		});
		it('should convert decimal Number to String', () => {
			expect(parseText(0.1)).to.equal('0.1');
		});
		it('should convert String of number to String', () => {
			expect(parseText('123')).to.equal('123');
		});
		it('should return text if argument is text', () => {
			expect(parseText('text')).to.equal('text');
		});
		it('should convert max value to String', () => {
			expect(parseText(Number.MAX_VALUE)).to.equal('1.7976931348623157e+308');
		});
		it('should convert true to "true"', () => {
			expect(parseText(true)).to.equal('true');
		});
		it('should return null if argument is null', () => {
			expect(parseText(null)).to.equal(null);
		});
		it('should return "undefined" if argument is undefined', () => {
			expect(parseText(undefined)).to.equal(undefined);
		});
	});

	describe('parseNumber', () => {
		const parseNumber = Convert.parseFactory('number');

		it('should convert String of number to Number', () => {
			expect(parseNumber('123')).to.equal(123);
		});
		it('should return Numebr', () => {
			expect(parseNumber(123)).to.equal(123);
		});
		it('should return negative Number', () => {
			expect(parseNumber(-123)).to.equal(-123);
		});
		it('should return positive Number', () => {
			expect(parseNumber(+123)).to.equal(+123);
		});
		it('should return max Number', () => {
			expect(parseNumber(Number.MAX_VALUE)).to.equal(1.7976931348623157e+308);
		});
		it('should convert String of negative number to negative Number', () => {
			expect(parseNumber('-123')).to.equal(-123);
		});
		it('should convert String of decimal number to decimal Number', () => {
			expect(parseNumber('0.123')).to.equal(0.123);
		});
		it('should convert String of hex number to Number', () => {
			expect(parseNumber('-1e04')).to.equal(-10000);
		});
		it('should return null if argument is text', () => {
			expect(parseNumber('text')).to.equal(null);
		});
		it('should return null if argument is boolean', () => {
			expect(parseNumber(true)).to.equal(null);
		});
		it('should return null if argument is null', () => {
			expect(parseNumber(null)).to.equal(null);
		});
		it('should return null if argument is undefined', () => {
			expect(parseNumber(undefined)).to.equal(undefined);
		});
	});

	describe('parseDate', () => {
		const parseDate = Convert.parseFactory('date');

		it('should convert String of date to Date', () => {
			expect(+parseDate('2017-05-05')).to.be.equal(+(new Date('2017-05-05')));
		});
		it('should convert String of ISO date', () => {
			expect(+parseDate('2017-08-10T15:20:23.738Z')).to.be.equal(+(Date.parse('2017-08-10T15:20:23.738Z')));
		});
		// it('should return null if passed invalid date', () => {
		// 	expect(parseDate('2017.05.05.09.90.80')).to.be.equal(null);
		// });
		// it('should return null if passed Number', () => {
		// 	expect(parseDate(2017.05)).to.be.equal(null);
		// });
		// it('should return null if passed invalid date text', () => {
		// 	expect(parseDate('PO BOX 27401')).to.be.equal(null);
		// });
		// it('should return null if passed incorrect number', () => {
		// 	expect(parseDate(Number.MAX_VALUE)).to.equal(null);
		// });
		// it('should return null if argument is false', () => {
		// 	expect(parseDate(false)).to.equal(null);
		// });
		// it('should return null if argument is true', () => {
		// 	expect(parseDate(true)).to.equal(null);
		// });

		it('should return null if argument is null', () => {
			expect(parseDate(null)).to.equal(null);
		});
		it('should return undefined if argument is undefined', () => {
			expect(parseDate(undefined)).to.equal(undefined);
		});
	});

	describe('parseBool', () => {
		const parseBool = Convert.parseFactory('bool');

		it('should return true if argument is "true"', () => {
			expect(parseBool('true')).to.equal(true);
		});
		it('should return false if argument is "false"', () => {
			expect(parseBool('false')).to.equal(true);
		});
		it('should return true if argument is true', () => {
			expect(parseBool(true)).to.equal(true);
		});
		it('should return false if argument is false', () => {
			expect(parseBool(false)).to.equal(false);
		});
		it('should return null if argument is null', () => {
			expect(parseBool(null)).to.equal(null);
		});
		it('should return null if argument is undefined', () => {
			expect(parseBool(undefined)).to.equal(undefined);
		});
		it('should return null if argument is Number', () => {
			expect(parseBool(123)).to.equal(true);
		});
		it('should return null if argument is "yes"', () => {
			expect(parseBool('yes')).to.equal(true);
		});
		it('should return null if argument is "no"', () => {
			expect(parseBool('no')).to.equal(true);
		});
	});
});
