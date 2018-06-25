import { StyleBox } from './style.box';

export class CellBox extends StyleBox {
	constructor(context) {
		super(context);
	}

	key(cell) {
		return `${cell.dataRowIndex}x${cell.dataColumnIndex}`;
	}
}