import { ColumnBox } from './column.box';

describe('ColumnBox', () => {
	const column = {
		dataIndex: 10
	};
	describe('key', () => {
		it('should return column index', () => {
			const columnBox = new ColumnBox();
			const index = columnBox.key(column);
			expect(index).to.equal(10);
		});
	});
});
