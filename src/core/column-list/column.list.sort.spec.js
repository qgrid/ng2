import * as ColumnListSort from './column.list.sort';
import {modelFactory} from '../test/model.factory';
import {ColumnModel} from '../column-type/column.model';

describe('sortIndexFactory', function () {
	it('sorting Test array based on the ColumnList.index values', () => { //[(right-10,1),(left-5,2),(center-6,3)]  =>
		let leftPinColumn1 = new ColumnModel();									 //[(left-2,5),(center-3,6),(right-1,10)]
		leftPinColumn1.pin = 'right';
		leftPinColumn1.key = 10;
		let leftPinColumn2 = new ColumnModel();
		leftPinColumn2.pin = 'right';
		leftPinColumn2.key = 1;
		let rightPinColumn1 = new ColumnModel();
		rightPinColumn1.pin = 'left';
		rightPinColumn1.key = 5;
		let rightPinColumn2 = new ColumnModel();
		rightPinColumn2.pin = 'left';
		rightPinColumn2.key = 2;
		let centerPinColumn1 = new ColumnModel();
		centerPinColumn1.pin = null;
		centerPinColumn1.key = 6;
		let centerPinColumn2 = new ColumnModel();
		centerPinColumn2.pin = null;
		centerPinColumn2.key = 3;

		let column1 = new ColumnModel();
		column1.key = 0;
		let column2 = new ColumnModel();
		column2.key = 0;
		let column3 = new ColumnModel();
		column3.key = 0;
		let model = modelFactory();
		let test = [leftPinColumn1, rightPinColumn1, centerPinColumn1, leftPinColumn2, rightPinColumn2, centerPinColumn2];
		model.columnList({
			index: [1, 2, 3, 5, 6, 10],
			columns: [column1, column2, column3]
		});

		let sort = ColumnListSort.sortIndexFactory(model);
		let result = sort(test);
		expect(JSON.stringify(result.index)).to.equals('[2,5,3,6,1,10]');
		expect(result.hasChanges).to.equals(true);
	});
});
