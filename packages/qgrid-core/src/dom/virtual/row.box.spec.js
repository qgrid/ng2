import { RowBox } from './row.box';

describe('RowBox', () => {
	const row = {
		dataIndex: 10
	};

	describe('key', () => {
		const rowBox = new RowBox();
		it('should return index of the row', () => {
			expect(rowBox.key(row)).to.equal(10);
		});
	});
});
