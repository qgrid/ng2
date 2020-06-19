export class Navigation {
	constructor(plugin, site) {
		this.plugin = plugin;
		this.site = site;
	}

	position(y, dir) {
		const { site } = this;
		const { table } = this.plugin;
		const { body } = table;

		const lastRow = site.lastRow;
		const lower = table.view.scrollHeight() - table.view.height();

		let index = 0;
		let offset = 0;

		// TODO: improve performance
		while (index <= lastRow && offset <= y) {
			offset += body.row(index).height();
			index++;
		}

		if (dir === 'down' && body.row(index)) {
			offset -= body.row(index).height();
			index--;
		}

		const row = Math.max(site.firstRow, Math.min(lastRow, index));
		offset = Math.min(offset, lower);
		return { row, offset };
	}

	cell(rowIndex, columnIndex) {
		const { table } = this.plugin;
		const cell = table.body.cell(rowIndex, columnIndex);
		const model = cell.model();
		if (model) {
			const { row, column } = model;
			return {
				rowIndex,
				columnIndex,
				row,
				column
			};
		}

		return null;
	}

	isActive() {
		const { model, table } = this.plugin;
		if (model.edit().status === 'view') {
			return true;
		}

		const column = table.body.column(this.site.currentColumn).model();
		return column && (column.editorOptions.trigger === 'focus' || column.editorOptions.cruise === 'transparent');
	};
}
