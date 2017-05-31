import {Element} from './element';
import {Row as RowModel} from '../row';

export class Row extends Element {
	constructor(box, index, element = null) {
		super(element);

		this.box = box;
		this.index = index;
	}

	get model() {
		const model = this.box.context.model(this.getElement());
		return model ? new RowModel(model) : null;
	}

	cells() {
		return this.box.rowCellsCore(this.index);
	}

	cell(columnIndex) {
		return this.box.cellCore(
			this.index,
			this.box.context.mapper.column(columnIndex)
		);
	}
}