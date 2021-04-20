import { PredicateVisitor } from './predicate.visitor';
import { getType } from '../services/convert';

function valueFactory() {
	return (value) => value;
}

const assertFactory = () => ({
	equals: (x, y) => x === y,
	lessThan: (x, y) => x < y,
	isNull: x => x === '' || x === null || x === undefined || isNaN(x) || isFinite(x)
});

const resolveType = (name, value) => getType(value);

describe('PredicateVisitor', () => {

	describe('visitGroup', () => {
		it('check for equality with op = "and"', () => {
			let group = {
				kind: 'group',
				op: 'and',
				right: {
					kind: 'condition',
					op: 'equals',
					right: 123,
					left: 'value'
				},
				left: {
					kind: 'condition',
					op: 'equals',
					right: 123,
					left: 'value'
				}
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let foo = predicateVisitor.visit(group);
			let res = foo(123);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "or"', () => {
			let group = {
				kind: 'group',
				op: 'or',
				right: {
					kind: 'condition',
					op: 'equals',
					right: 'Some string',
					left: 'value'
				},
				left: {
					kind: 'condition',
					op: 'equals',
					right: 123,
					left: 'value'
				}
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let foo = predicateVisitor.visit(group);
			let res = foo(123);
			expect(res).to.equal(true);
			expect(foo('Some string')).to.equal(true)
		});
	});

	describe('visit condition', () => {
		it('check for equality with op = "notEquals"', () => {
			let condition = {
				kind: 'condition',
				op: 'notEquals',
				right: 123,
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match(999);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "greaterThan"', () => {
			let condition = {
				kind: 'condition',
				op: 'greaterThan',
				right: 123,
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match(999);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "lessThan"', () => {
			let condition = {
				kind: 'condition',
				op: 'lessThan',
				right: 123,
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match(1);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "between" inside range', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match(15);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "between" outside range ', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res3 = match(5);
			expect(res3).to.equal(false);
		});

		it('check for equality with op = "between" outside range', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res4 = match(21);
			expect(res4).to.equal(false);
		});

		it('check for equality with op = "between" on bounds of range', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res4 = match(10);
			expect(res4).to.equal(true);
		});

		it('check for equality with op = "between" on bounds of range', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res4 = match(20);
			expect(res4).to.equal(true);
		});

		it('check for equality with op = "between" on bounds of the range, start date is set', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [Date.parse('05/05/2012')],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(Date.parse('05/05/2099'));
			expect(res).to.equal(true);
		});

		it('check for equality with op = "between" out of bounds of the range, start date is set', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [Date.parse('05/05/2012')],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(Date.parse('04/05/2012'));
			expect(res).to.equal(false);
		});

		it('check for equality with op = "between" on bounds of the range, both dates are set', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [Date.parse('05/05/2011'), Date.parse('01/01/2013')],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(Date.parse('12/31/2012'));
			expect(res).to.equal(true);
		});

		it('check for equality with op = "between" out of bounds of the range, both dates are set', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [Date.parse('05/05/2011'), Date.parse('01/01/2013')],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(Date.parse('12/31/2099'));
			expect(res).to.equal(false);
		});

		it('check for equality with op = "between" on bounds of the range, end date is set', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [, Date.parse('05/05/2012')],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(Date.parse('05/04/2012'));
			expect(res).to.equal(true);
		});

		it('check for equality with op = "between" out of bounds of the range, end date is set', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [, Date.parse('05/05/2012')],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(Date.parse('05/06/2012'));
			expect(res).to.equal(false);
		});

		it('check for equality with op = "in" with number value', () => {
			let condition = {
				kind: 'condition',
				op: 'in',
				right: [10, 20],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(10);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "in" with string value', () => {
			let condition = {
				kind: 'condition',
				op: 'in',
				right: [10, 20],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(10);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "in" and string array value', () => {
			let condition = {
				kind: 'condition',
				op: 'in',
				right: [10, 20],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match(['10', '30']);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "in" and number array value', () => {
			let condition = {
				kind: 'condition',
				op: 'in',
				right: [10, 20],
				left: 'value',
			};
			let predicateVisitor = new PredicateVisitor(
				valueFactory,
				assertFactory,
				resolveType
			);
			let match = predicateVisitor.visit(condition);
			let res = match([10, 30]);
			expect(res).to.equal(true);
		});

		it('check whether "findSomeString" contains "Some"', () => {
			let condition = {
				kind: 'condition',
				op: 'like',
				right: 'SOME',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match('findSomeString');
			expect(res).to.equal(true);
		});

		it('"findSomeString" should not contains "text"', () => {
			let condition = {
				kind: 'condition',
				op: 'notLike',
				right: 'text',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match('findSomeString');
			expect(res).to.equal(true);
		});

		it('"findSomeString" should starts with "find"', () => {
			let condition = {
				kind: 'condition',
				op: 'startsWith',
				right: 'find',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match('findSomeString');
			expect(res).to.equal(true);
		});

		it('"findSomeString" should ends with "String"', () => {
			let condition = {
				kind: 'condition',
				op: 'endsWith',
				right: 'String',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match('findSomeString');
			expect(res).to.equal(true);
		});
	});

	describe('visitGroup', () => {
		it('should return true if 101 greater than or equals 100', () => {
			let condition = {
				kind: 'condition',
				op: 'greaterThanOrEquals',
				right: 100,
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match(101);
			expect(res).to.equal(true);
		});

		it('should return true if 99 less than or equals 100', () => {
			let condition = {
				kind: 'condition',
				op: 'lessThanOrEquals',
				right: 100,
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match(99);
			expect(res).to.equal(true);
		});

		it('should return value if not null', () => {
			let condition = {
				kind: 'condition',
				op: 'isNotNull',
				right: '',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match('NotNull');
			expect(res).to.equal(false);
		});

		it('should return true if null', () => {
			let condition = {
				kind: 'condition',
				op: 'isNull',
				right: '',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory, assertFactory, resolveType);
			let match = predicateVisitor.visit(condition);
			let res = match(null);
			expect(res).to.equal(true);
		});
	});

});

