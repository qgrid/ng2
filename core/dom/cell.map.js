import * as columnService from '../column/column.service';

export function cellMapFactory(model) {
	const view = model.view;
	return {
		row: (index, entry) => {
			if (entry) {
				return entry.rowIndex;
			}

			return index;
		},
		column: (index, entry) => {
			if (entry) {
				return entry.column.key;
			}
			const columns = view().columns;
			const line = columnService.lineView(columns);
			const column = line[index];
			return column ? column.model.key : null;
		}
	};
}