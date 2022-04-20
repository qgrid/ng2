import { CellBox } from './cell.box';

describe('CellBox', () => {
	const cell = {
		dataRowIndex: 10,
		dataColumnIndex: 20
	};

	describe('key', () => {
		it('should concat 2 properties', () => {
			const cellBox = new CellBox();
			expect(cellBox.key(cell)).to.equal('10x20');
		});
	});
});
