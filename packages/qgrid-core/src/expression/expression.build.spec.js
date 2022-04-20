import { buildExpression } from './expression.build';

describe('Expression Build', () => {
	const test1 = {
		key: {
			expression: 'expression'
		}
	};

	const test2 = {
		key: {
			expression: 'expression',
			items: ['a', 'b', 'c']
		}
	};

	const etalon1 = {
		kind: 'group',
		op: 'and',
		left: 'expression',
		right: null
	};

	const etalon2 = {
		kind: 'group',
		op: 'and',
		left: 'expression',
		right: {
			kind: 'group',
			op: 'and',
			left: {
				kind: 'group',
				op: 'and',
				left: {
					kind: 'condition',
					left: 'key',
					op: 'in',
					right: ['a', 'b', 'c']
				},
				right: null
			},
			right: null
		}
	};

	describe('build', () => {
		it('should built expression into root object', () => {
			const root = buildExpression(test1);
			expect(JSON.stringify(root)).to.equal(JSON.stringify(etalon1));
		});

		it('should check whether items were built into root object', () => {
			const root = buildExpression(test2);
			expect(JSON.stringify(root)).to.equal(JSON.stringify(etalon2));
		});
	});
});
