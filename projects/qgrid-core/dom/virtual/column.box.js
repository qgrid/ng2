import { StyleBox } from './style.box';

export class ColumnBox extends StyleBox {
	constructor(context) {
		super(context);
	}

	key(column) {
		return column.dataIndex;
	}
}