export class VirtualRowStyle {
	constructor(table, style) {
		this.table = table;
		this.style = style;
	}

	visitFactory() {
		const style = this.style;
		const mapper = this.table.context.mapper;
		const box = this.table.body.rowBox;
		const entries = box.entries;

		return (row, context) => {
			context.row = mapper.viewToRow(context.row);

			const model = {
				dataIndex: context.row,
			};

			const key = box.key(model);
			const classList = entries.get(key);
			if (classList) {
				for (let cls of classList) {
					context.class(cls);
				}
			}

			style(row, context);
		};
	}
}

export class VirtualCellStyle {
	constructor(table, style) {
		this.table = table;
		this.style = style;
	}

	visitFactory() {
		const style = this.style;
		const mapper = this.table.context.mapper;
		const cellBox = this.table.body.cellBox;
		const cellEntries = cellBox.entries;
		const columnBox = this.table.body.columnBox;
		const columnEntries = columnBox.entries;

		return (row, column, context) => {
			context.column = mapper.viewToColumn(context.column);
			context.row = mapper.viewToRow(context.row);

			// column level
			const columnModel = {
				dataIndex: context.column,
			};

			const columnKey = columnBox.key(columnModel);
			const columnClassList = columnEntries.get(columnKey);
			if (columnClassList) {
				for (let cls of columnClassList) {
					context.class(cls);
				}
			}

			// cell level
			const cellModel = {
				dataRowIndex: context.row,
				dataColumnIndex: context.column,
			};

			const cellKey = cellBox.key(cellModel);
			const cellClassList = cellEntries.get(cellKey);
			if (cellClassList) {
				for (let cls of cellClassList) {
					context.class(cls);
				}
			}

			// add classes
			style(row, column, context);
		};
	}
}