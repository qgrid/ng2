import {Column} from '../column';

export class VirtualColumn extends Column {
	constructor(box, index) {
		super(box, index);

		this.box = box;

		const mapper = box.context.mapper;
		this.dataIndex = mapper.viewToColumn(index);
	}

	cells() {
		return this.box.columnCellsCore(this.dataIndex);
	}

	cell(rowIndex) {
		return this.box.cell(rowIndex, this.dataIndex);
	}

	addClass(name, force = false) {
		this.box.addColumnClass(this, name, force);
	}

	removeClass(name, force = false) {
		this.box.removeColumnClass(this, name, force);

	}
}
