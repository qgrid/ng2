import * as ExpressionBuild from './expression.build';

describe('Expression Build', () => {
	let test1 = {
		key: {
			expression: 'expression'
		},
	};

	let test2 = {
		key: {
			expression: 'expression',
			items: ['a', 'b', 'c']
		}
	};

	let test3 = {
		kind: 'group',
		op: 'and',
		left: 'expression',
		right: null
	};

	let test4 = {
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
			let root = ExpressionBuild.build(test1);
			expect(JSON.stringify(root)).to.equal(JSON.stringify(test3));
		});

		it('should check whether items were built into root object', () => {
			let root = ExpressionBuild.build(test2);
			expect(JSON.stringify(root)).to.equal(JSON.stringify(test4));
		});
	});
});
