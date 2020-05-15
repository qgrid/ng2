import { filter, takeOnce } from '@qgrid/core/rx/rx.operators';

export class AutofocusPlugin {
	constructor(plugin) {
		const { model, table, observeReply } = plugin;

		observeReply(model.sceneChanged)
			.pipe(
				filter(e => {
					if (e.hasChanges('status') && e.state.status === 'stop') {
						const count = table.body.rowCount(0);
						if (count) {
							return true
						}
					}

					return false
				}),
				takeOnce()
			)
			.subscribe(() => {
				const key = Object.keys(table.box.markup).find(p => p.startsWith('body'));

				if (key) {
					const element = table.box.markup[key];
					if (element) {
						element.focus();
					}
				}

				const { body } = table;
				const { focus } = model;
				const focusState = focus();
				const cell = body.cell(focusState.rowIndex, focusState.columnIndex);
				const cellModel = cell.model();

				if (!cellModel || !cellModel.column.canFocus) {
					let rowIndex = 0;
					const rowCount = body.rowCount(0);
					while (rowIndex < rowCount) {
						const row = body.row(rowIndex);
						const cells = row.cells();
						const columnIndex = cells.findIndex(c => {
							const m = c.model();
							return m && m.column.canFocus;
						});

						if (columnIndex >= 0) {
							focus({ rowIndex, columnIndex }, { source: 'autofocus.plugin' });
							break;
						}

						rowIndex++;
					}
				}
			});
	}
}
