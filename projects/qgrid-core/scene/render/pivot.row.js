import { getFactory } from '../../services/value';
import { groupBuilder } from '../../group/group.build';

export class PivotRow {
	constructor(plugin, dataRow) {
		const { model, observeReply } = plugin;
		this.columns = dataRow.columns;
		this.rowspan = dataRow.rowspan;
		this.colspan = dataRow.colspan;

		this.getValue = dataRow.getValue;
		this.setValue = dataRow.setValue;

		this.getLabel = dataRow.getLabel;
		this.setLabel = dataRow.setLabel;

		this.columnList = dataRow.columnList;

		let pivotRows = [];

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column') || e.hasChanges('rows')) {
					const { rows } = model.view().pivot;
					if (rows.length) {
						if (model.group().by.length) {
							const build = groupBuilder(model);
							pivotRows = build(getFactory);
						} else {
							pivotRows = rows;
						}

						const pivotIndex = e.state.column.line.findIndex(c => c.model.type === 'pivot');

						this.getValue = (row, column, select, rowIndex, columnIndex) => {
							if (column.type === 'pivot') {
								const pivotRow = pivotRows[rowIndex];
								return pivotRow[columnIndex - pivotIndex];
							}

							return dataRow.getValue(row, column, select, rowIndex, columnIndex);
						};

						this.getLabel = (row, column, select, rowIndex, columnIndex) => {
							if (column.type === 'pivot') {
								const pivotRow = pivotRows[rowIndex];
								return pivotRow[columnIndex - pivotIndex];
							}

							return dataRow.getLabel(row, column, select, rowIndex, columnIndex);
						};
					}
					else {
						pivotRows = [];
						this.getValue = dataRow.getValue;
						this.getLabel = dataRow.getLabel;
					}
				}
			});
	}
}
