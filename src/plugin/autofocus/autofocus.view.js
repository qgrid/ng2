export class AutofocusView {
	constructor(model, table, markup) {
		model.sceneChanged.watch((e, off) => {
			if (e.hasChanges('status')) {
				if (e.state.status === 'stop') {
					const count = table.body.rowCount(0);
					if (count) {
						off();

						const key = Object.keys(markup).find(p => p.startsWith('body'));
						if (key) {
							const element = markup[key];
							if (element) {
								element.focus();
							}
						}

						const body = table.body;
						const focus = model.focus;
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
									focus({ rowIndex, columnIndex }, { source: 'autofocus.view' });
									break;
								}

								rowIndex++;
							}
						}
					}
				}
			}
		});
	}
}
