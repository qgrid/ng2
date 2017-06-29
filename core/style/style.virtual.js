export class VirtualRowStyle {
	constructor(table) {
		const model = table.model;
		this.table = table;
		this.model = model;
	}

	applyFactory() {
		const model = this.model;
		const style = model.style().row;
		const mapper = this.table.context.mapper;
		const box = this.table.body.rowBox;
		const entries = box.entries;

		return (row, context) => {
			const model = {
				index: context.row,
			};

			const key = box.key(model);
			const classList = entries.get(key);
			if (classList) {
				for (let cls of classList) {
					context.class(cls);
				}
			}

			context.row = mapper.rowBack(context.row);
			style(row, context);
		};
	}
}

export class VirtualCellStyle {
	constructor(table) {
		const model = table.model;
		this.table = table;
		this.model = model;
	}

	applyFactory() {
		const model = this.model;
		const style = model.style().cell;
		const mapper = this.table.context.mapper;
		const box = this.table.body.cellBox;
		const entries = box.entries;

		return (row, column, context) => {
			const model = {
				rowIndex: context.row,
				columnIndex: context.column,
			};

			const key = box.key(model);
			const classList = entries.get(key);
			if (classList) {
				for (let cls of classList) {
					context.class(cls);
				}
			}

			context.row = mapper.rowBack(context.row);
			context.column = mapper.columnBack(context.column);
			style(row, column, context);
		};
	}
}