import {StyleBox} from './style.box';

export class CellBox extends StyleBox {
	constructor(context) {
		super(context);
	}

	key(cell) {
		const mapper = this.context.mapper;
		const dataRow = mapper.rowBack(cell.rowIndex);
		const dataColumn = mapper.columnBack(cell.columnIndex);
		return `${dataRow}x${dataColumn}`;
	}
}