import { ColumnModel } from '../column-type/column.model';
import { modelFactory } from '../test/model.factory';
import * as ColumnListSort from './column.list.sort';

describe('sortIndexFactory', function () {
	// [(right-10,1),(left-5,2),(center-6,3)]  =>
	// [(left-2,5),(center-3,6),(right-1,10)]
	it('sorting Test array based on the ColumnList.index values', () => {
		const leftPinColumn1 = new ColumnModel();
		leftPinColumn1.pin = 'right';
		leftPinColumn1.key = 10;
		const leftPinColumn2 = new ColumnModel();
		leftPinColumn2.pin = 'right';
		leftPinColumn2.key = 1;
		const rightPinColumn1 = new ColumnModel();
		rightPinColumn1.pin = 'left';
		rightPinColumn1.key = 5;
		const rightPinColumn2 = new ColumnModel();
		rightPinColumn2.pin = 'left';
		rightPinColumn2.key = 2;
		const centerPinColumn1 = new ColumnModel();
		centerPinColumn1.pin = 'mid';
		centerPinColumn1.key = 6;
		const centerPinColumn2 = new ColumnModel();
		centerPinColumn2.pin = 'mid';
		centerPinColumn2.key = 3;

		const column1 = new ColumnModel();
		column1.key = 0;
		const column2 = new ColumnModel();
		column2.key = 0;
		const column3 = new ColumnModel();
		column3.key = 0;
		const model = modelFactory();
		const test = [leftPinColumn1, rightPinColumn1, centerPinColumn1, leftPinColumn2, rightPinColumn2, centerPinColumn2];
		model.columnList({
			index: [1, 2, 3, 5, 6, 10],
			columns: [column1, column2, column3]
		});

		const sort = ColumnListSort.sortIndexFactory(model);
		const result = sort(test);
		expect(result).to.eql([5,2,6,3,10,1]);
	});
});
