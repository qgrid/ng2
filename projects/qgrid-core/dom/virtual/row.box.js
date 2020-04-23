import { StyleBox } from './style.box';

export class RowBox extends StyleBox {
	constructor(context) {
		super(context);
	}

	key(row) {
		return row.dataIndex;
	}
}