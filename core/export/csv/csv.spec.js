import {Csv} from './csv';
import {ColumnModel} from '../../column-type/column.model';

describe('Csv', () => {
	let column1 = new ColumnModel();
	column1.title = 'Name';
	column1.value = row => row;
	let column2 = new ColumnModel();
	column2.title = 'Age';
	column2.value = row => row;
	let column3 = new ColumnModel();
	column3.title = 'Occupation';
	column3.value = row => row;

	let columns = [column1, column2, column3];
	let rows = ['Empty','Filled'];

	let csv = new Csv();

	describe('write', () => {
		it('should return string separated by commas and new lines', () => {
			let result = csv.write(rows, columns);
			expect(result).to.equal('Name,Age,Occupation\nEmpty,Empty,Empty\nFilled,Filled,Filled');
		});
	});
});
