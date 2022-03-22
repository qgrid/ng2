import { getValue, setValue } from "./value";

describe('value service', () => {
	let row;

	const templateDefinedColumn = {
		$value: (args) => args.$value === undefined
			? args.$row.nested.field
			: args.$row.nested.field = args.$value
	};

	const controllerDefinedColumn = {
		value: (item, value) => value === undefined
			? item.nested.field
			: item.nested.field = value
	};

	const pathDefinedColumn = {
		path: 'nested.field'
	};

	const keyDefinedColumn = {
		key: 'field'
	};

	describe('getter', () => {
		before('set source row', () => {
			row = {
				'field': 'field_value',
				'nested': {
					'field': 'nested_field_value'
				}
			};
		});

		it('should return value for column with value getter in template', () => {
			const value = getValue(row, templateDefinedColumn);

			expect(value).to.equal('nested_field_value');
		});

		it('should return value for column with value getter in controller', () => {
			const value = getValue(row, controllerDefinedColumn);

			expect(value).to.equal('nested_field_value');
		});

		it('should return value for column with defined path', () => {
			const value = getValue(row, pathDefinedColumn);

			expect(value).to.equal('nested_field_value');
		});

		it('should return value by key', () => {
			const value = getValue(row, keyDefinedColumn);

			expect(value).to.equal('field_value');
		});
	});

	describe('setter', () => {
		beforeEach('set source row', () => {
			row = {
				'field': 'field_value',
				'nested': {
					'field': 'nested_field_value'
				}
			};
		});

		it('should set new value for column with value setter in template', () => {
			setValue(row, templateDefinedColumn, 'new_value');

			expect(row.nested.field).to.equal('new_value');
		});

		it('should set new value for column with value setter in controller', () => {
			setValue(row, controllerDefinedColumn, 'new_value');

			expect(row.nested.field).to.equal('new_value');
		});

		it('should set new value for column with defined path', () => {
			setValue(row, pathDefinedColumn, 'new_value');

			expect(row.nested.field).to.equal('new_value');
		});

		it('should set new value by key', () => {
			setValue(row, keyDefinedColumn, 'new_value');

			expect(row.field).to.equal('new_value');
		});

		it('should throw exception if any way isn\'t able', () => {
			const column = {
				key: 'wrongKey'
			};

			const setter = () => setValue(row, column, 'new_value');

			expect(setter).to.throw(/Row can't be edit on "wrongKey" column/);
		});
	});
});
