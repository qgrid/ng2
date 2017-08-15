import * as columnService from '../column/column.service';

export function sortIndexFactory(model) {
	return columns => {
		const columnMap = columnService.map(columns);
		const index =
			model.columnList()
				.index
				.filter(key => columnMap.hasOwnProperty(key));

		const indexSet = new Set(index);
		const appendIndex = columns.filter(c => !indexSet.has(c.key));
		const orderIndex = Array.from(appendIndex);
		orderIndex.sort((x, y) => {
			if (x.index === y.index) {
				return appendIndex.indexOf(x) - appendIndex.indexOf(y);
			}

			if (x.index < 0) {
				return 1;
			}

			if (y.index < 0) {
				return -1;
			}

			return x.index - y.index;
		});

		index.push(...orderIndex.map(c => c.key));
		return {
			index: index,
			hasChanges: orderIndex.length > 0
		};
	};
}