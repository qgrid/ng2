import {PredicateVisitor} from './predicate.visitor';

function valueFactory() {
	return (value) => value;
}
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
			let predicateVisitor = new PredicateVisitor(valueFactory);
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
			let predicateVisitor = new PredicateVisitor(valueFactory);
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
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo(999);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "greaterThan"', () => {
			let condition = {
				kind: 'condition',
				op: 'greaterThan',
				right: 123,
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo(999);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "lessThan"', () => {
			let condition = {
				kind: 'condition',
				op: 'lessThan',
				right: 123,
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo(1);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "between" inside range', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo(15);
			expect(res).to.equal(true);
		});

		it('check for equality with op = "between" outside range ', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res3 = foo(5);
			expect(res3).to.equal(false);
		});

		it('check for equality with op = "between" outside range', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res4 = foo(21);
			expect(res4).to.equal(false);
		});

		it('check for equality with op = "between" on bounds of range', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res4 = foo(10);
			expect(res4).to.equal(true);
		});

		it('check for equality with op = "between" on bounds of range', () => {
			let condition = {
				kind: 'condition',
				op: 'between',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res4 = foo(20);
			expect(res4).to.equal(true);
		});

		it('check for equality with op = "in"', () => {
			let condition = {
				kind: 'condition',
				op: 'in',
				right: [10, 20],
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo(10);
			expect(res).to.equal(true);
		});

		it('check whether "findSomeString" contains "Some"', () => {
			let condition = {
				kind: 'condition',
				op: 'like',
				right: 'SOME',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo('findSomeString');
			expect(res).to.equal(true);
		});

		it('"findSomeString" should not contains "text"', () => {
			let condition = {
				kind: 'condition',
				op: 'notLike',
				right: 'text',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo('findSomeString');
			expect(res).to.equal(true);
		});

		it('"findSomeString" should starts with "find"', () => {
			let condition = {
				kind: 'condition',
				op: 'startsWith',
				right: 'find',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo('findSomeString');
			expect(res).to.equal(true);
		});

		it('"findSomeString" should ends with "String"', () => {
			let condition = {
				kind: 'condition',
				op: 'endsWith',
				right: 'String',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo('findSomeString');
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
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo(101);
			expect(res).to.equal(true);
		});

		it('should return true if 99 less than or equals 100', () => {
			let condition = {
				kind: 'condition',
				op: 'lessThanOrEquals',
				right: 100,
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo(99);
			expect(res).to.equal(true);
		});

		it('should return value if not null', () => {
			let condition = {
				kind: 'condition',
				op: 'isNotNull',
				right: '',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo('NotNull');
			expect(res).to.equal('NotNull');
		});

		it('should return true if null', () => {
			let condition = {
				kind: 'condition',
				op: 'isNull',
				right: '',
				left: 'value'
			};
			let predicateVisitor = new PredicateVisitor(valueFactory);
			let foo = predicateVisitor.visit(condition);
			let res = foo(null);
			expect(res).to.equal(true);
		});
	});

});

