import {ColumnBox} from './column.box';

describe('ColumnBox', () => {
	let column = {
		dataIndex: 10
	};
	describe('key', () => {
		it('should return column index', () => {
			let columnBox = new ColumnBox();
			let index = columnBox.key(column);
			expect(index).to.equal(10);
		});
	});
});