import {stringifyFactory} from './model.stringify';

describe('model stringify', () => {
	let stringify;

	describe('filter', () => {
		const model = {
			by: {
				lastName: {
					items: ['Smith', 'Doe']
				},
				gender: {
					items: ['male']
				}
			}
		};

		const empty = {by: {}};

		beforeEach(() => {
			stringify = stringifyFactory('filter');
		});

		it('should return empty row when model is empty', () => {
			expect(stringify(empty)).to.equal('');
		});

		it('should return items enumeration', () => {
			const etalon = 'filter Smith, Doe, male';

			const target = stringify(model);

			expect(target).to.equal(etalon);
		});
	});

	describe('sort', () => {
		const model = {
			by: [{
				lastName: 'asc',
				age: 'desc'
			}]
		};

		const empty = {by: []};

		beforeEach(() => {
			stringify = stringifyFactory('sort');
		});

		it('should return empty row when model is empty', () => {
			expect(stringify(empty)).to.equal('');
		});

		it('should return column keys enumeration', () => {
			const etalon = 'sort lastName, age';

			const target = stringify(model);

			expect(target).to.equal(etalon);
		});
	});

	describe('transform by', () => {
		const model = {
			by: ['lastName', 'gender']
		};

		const empty = {by: []};

		it('should return empty row when model is empty', () => {
			const stringifyGroup = stringifyFactory('group');

			expect(stringifyGroup(empty)).to.equal('');
		});

		it('should return column keys enumeration for group', () => {
			const stringifyGroup = stringifyFactory('group');
			const etalon = 'group lastName, gender';

			const target = stringifyGroup(model);

			expect(target).to.equal(etalon);
		});

		it('should return column keys enumeration for pivot', () => {
			const stringifyPivot = stringifyFactory('pivot');
			const etalon = 'pivot lastName, gender';

			const target = stringifyPivot(model);

			expect(target).to.equal(etalon);
		});
	});
});