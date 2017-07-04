import * as labelService from './label';

describe('label service', () => {
	let row;

	const controllerDefinedColumn = {
		label: (item, label) => label === undefined
			? `${item.nested.fieldLabel}: ${item.nested.field}`
			: item.nested.fieldLabel = label
	};

	const pathDefinedColumn = {
		labelPath: 'nested.fieldLabel'
	};

	const keyDefinedColumn = {
		key: 'field'
	};

	describe('getter', () => {
		before('set source row', () => {
			row = {
				'field': 'field_value',
				'nested': {
					'field': 'nested_field_value',
					'fieldLabel': 'label'
				}
			};
		});

		it('should return value for column with value getter in controller', () => {
			const label = labelService.get(row, controllerDefinedColumn);

			expect(label).to.equal('label: nested_field_value');
		});

		it('should return label for column with defined path', () => {
			const label = labelService.get(row, pathDefinedColumn);

			expect(label).to.equal('label');
		});

		it('should return value when label wasn\'t defined', () => {
			const label = labelService.get(row, keyDefinedColumn);

			expect(label).to.equal('field_value');
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

		it('should set new label for column with label setter in controller', () => {
			labelService.set(row, controllerDefinedColumn, 'new_label');

			expect(row.nested.fieldLabel).to.equal('new_label');
		});

		it('should set new label for column with defined path', () => {
			labelService.set(row, pathDefinedColumn, 'new_label');

			expect(row.nested.fieldLabel).to.equal('new_label');
		});
	});
});