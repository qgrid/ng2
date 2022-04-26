import { ColumnModel } from '../../column-type/column.model';
import { CsvExport } from './csv';

describe('Csv', () => {
	const column1 = new ColumnModel();
	column1.title = 'Name';
	column1.value = row => row;
	const column2 = new ColumnModel();
	column2.title = 'Age';
	column2.value = row => row;
	const column3 = new ColumnModel();
	column3.title = 'Occupation';
	column3.value = row => row;

	const columns = [
		column1,
		column2,
		column3,
	];
	const rows = ['Empty','Filled'];

	const csv = new CsvExport();

	describe('write', () => {
		it('should return string separated by commas and new lines', () => {
			const result = csv.write(rows, columns);
			expect(result).to.equal('Name,Age,Occupation\nEmpty,Empty,Empty\nFilled,Filled,Filled');
		});
	});
});
