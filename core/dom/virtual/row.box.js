import {StyleBox} from './style.box';

export class RowBox extends StyleBox {
	constructor(context) {
		super(context);
	}

	key(row) {
		const mapper = this.context.mapper;
		const dataRow = mapper.rowBack(row.index);
		return dataRow;
	}
}