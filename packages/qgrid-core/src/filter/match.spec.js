import { modelFactory } from '../test/model.factory';
import * as Match from './match';

describe('Match', () => {

	const column = {
		key: 'value',
		type: 'number'
	};

	const columns = [column];

	const test = {
		key: {
			expression: {
				kind: 'condition',
				op: 'equals',
				right: 123,
				left: 'value'
			}
		},
	};

	const model = modelFactory();
	model.filter({
		by: test,
		assertFactory: () => ({
			equals: (x, y) => x === y,
			lessThan: (x, y) => x < y,
			isNull: x => x === '' || x === null || x === undefined || isNaN(x) || isFinite(x)
		})
	});
	model.data({ columns });

	model.columnList = () => ({
		line: columns,
	});

	const context = {
		model,
		valueFactory: value => value => value,
		labelFactory: value => value => value,
	};

	describe('match', () => {
		it('should return true if there are matching entities', () => {
			const test = Match.match(context);
			const result = test(123);
			expect(result).to.equal(true);
		});

		it('should return false if there are no matching entities', () => {
			const test = Match.match(context);
			const result = test(321);
			expect(result).to.equal(false);
		});
	});
});
