export function sortIndexFactory(model) {
	return (columns, scores) => {
		const columnListState = model.columnList();
		const { length } = columns;
		scores = Object.assign({
			list: column => column.class === 'data' ? 0.1 : 0.3,
			index: () => 0.2,
			view: column => length + (column.class !== 'data' ? 0.1 : 0.3),
			template: () => length + 0.4
		}, scores);

		const listIndex = columnListState.index;
		const templateIndex = columnListState.columns.map(c => c.key);
		const viewIndex = columns.map(c => c.key);

		const sort = sortFactory(scores)(listIndex, templateIndex, viewIndex);
		const left = sort(columns.filter(c => c.pin === 'left'));
		const center = sort(columns.filter(c => !c.pin));
		const right = sort(columns.filter(c => c.pin === 'right'));

		const index = left.concat(center).concat(right);
		return {
			index,
			hasChanges: !equals(listIndex, index)
		};
	};
}

function sortFactory(scores) {
	return (listIndex, templateIndex, viewIndex) => {
		const compare = compareFactory(scores, listIndex, templateIndex, viewIndex);
		return columns => {
			const columnIndex = Array.from(columns);
			columnIndex.sort(compare);

			return columnIndex.map(c => c.key);
		};
	};
}

function compareFactory(scoreFor, listIndex, templateIndex, viewIndex) {
	const listFind = findFactory(listIndex);
	const viewFind = findFactory(viewIndex);
	const templateFind = findFactory(templateIndex);

	const weightCache = {};
	const getWeight = column => {
		const key = column.key;
		if (weightCache.hasOwnProperty(key)) {
			return weightCache[key];
		}

		const candidates = [
			listFind(key) + scoreFor.list(column),
			column.index + scoreFor.index(column),
			viewFind(key) + scoreFor.view(column),
			templateFind(key) + scoreFor.template(column)
		];

		const weights = candidates.filter(w => w >= 0);
		const weight = weights.length ? weights[0] : -1;
		weightCache[key] = weight;

		return weight;
	};

	return (x, y) => {
		const xi = getWeight(x);
		const yi = getWeight(y);

		return yi === -1 ? -1 : xi === -1 ? 1 : xi - yi;
	};
}

function findFactory(index) {
	const map =
		index.reduce((memo, key, i) => {
			memo.set(key, i);
			return memo;
		}, new Map());

	return key => map.has(key) ? map.get(key) : -1;
}

function equals(xs, ys) {
	const length = xs.length;
	if (length !== ys.length) {
		return false;
	}

	for (let i = 0; i < length; i++) {
		if (xs[i] !== ys[i]) {
			return false;
		}
	}
	return true;
}