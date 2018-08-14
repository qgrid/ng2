import { bend, copy } from '../node/node.service';
import { preOrderDFS } from '../node/node.service';

export { sortIndexFactory, merge };

function sortIndexFactory(model) {
	const templateIndex = model.columnList().columns.map(c => c.key);

	return (columns, scores) => {
		const { length } = columns;
		scores = Object.assign({
			list: column => (column.class === 'data' || column.class === 'cohort') ? 0.1 : 0.3,
			index: () => 0.2,
			view: column => length + ((column.class !== 'data' && column.class !== 'cohort') ? 0.1 : 0.3),
			template: () => length + 0.4
		}, scores);

		const viewIndex = columns.map(c => c.key);

		const sort = sortFactory(scores)(templateIndex, viewIndex);
		const left = sort(columns.filter(c => c.pin === 'left'));
		const center = sort(columns.filter(c => !c.pin));
		const right = sort(columns.filter(c => c.pin === 'right'));

		return left.concat(center).concat(right);
	};
}

function sortFactory(scores) {
	return (templateIndex, viewIndex) => {
		const compare = compareFactory(scores, templateIndex, viewIndex);
		return columns => {
			const columnIndex = Array.from(columns);
			columnIndex.sort(compare);

			return columnIndex.map(c => c.key);
		};
	};
}

function compareFactory(scoreFor, templateIndex, viewIndex) {
	const viewFind = findFactory(viewIndex);
	const templateFind = findFactory(templateIndex);

	const weightCache = {};
	const getWeight = column => {
		const key = column.key;
		if (weightCache.hasOwnProperty(key)) {
			return weightCache[key];
		}

		const candidates = [
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
	const map = index.reduce((memo, key, i) => {
		memo.set(key, i);
		return memo;
	}, new Map());

	return key => (map.has(key) ? map.get(key) : -1);
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

function merge(newTree, oldTree, buildIndex) {
	const current = running(newTree, buildIndex);
	const screen = former(oldTree, current);
	const insertNear = insertFactory(current, screen);
	const insertCohort = insertCohortFactory(current, screen);

	const root = current.line[0];
	if (!screen.set.has(root.key.model.key)) {
		screen.line.unshift(copy(root));
		screen.line.forEach(n => n.level++);
	}

	for (let i = 1, length = current.line.length; i < length; i++) {
		const node = current.line[i];
		const { model } = node.key;
		if (screen.set.has(model.key)) {
			continue;
		}

		const prevNode = current.line[i - 1];
		if (model.type === 'cohort') {
			insertCohort(prevNode, node);
		} else {
			insertNear(prevNode, node, i);
		}
	}

	return bend(screen.line);
}

function running(tree, buildIndex) {
	const result = {
		line: [],
		map: new Map()
	};

	preOrderDFS([tree], node => {
		result.line.push(node);
		result.map.set(node.key.model.key, node.key);

		// As we use pre order direction we can manipulate with children without affecting on algorithm.
		// Below we sort columns in appropriate order.
		const columns = node.children.map(child => child.key.model);
		const index = buildIndex(columns);

		let cursor = 0;
		const indexMap = index.reduce((memo, key) => {
			memo[key] = cursor++;
			return memo;
		}, {});

		node.children.sort((x, y) => indexMap[x.key.model.key] - indexMap[y.key.model.key]);
	});

	return result;
}

function former(tree, current) {
	const result = {
		line: [],
		set: new Set()
	};

	preOrderDFS([tree], node => {
		// Filter out nodes if they were deleted from newTree.
		const { key } = node.key.model;
		const view = current.map.get(key);
		if (view) {
			const newNode = copy(node);
			newNode.key = view;
			result.line.push(newNode);
			result.set.add(key);
		}
	});

	return result;
}

function insertFactory(current, screen) {
	const { line } = screen;
	return (prevNode, node, i) => {
		let pos = line.findIndex(n => n.key.model.key === prevNode.key.model.key);

		const target = copy(node);
		target.level = node.level;

		if (everyNextIsNew(current, screen, i)) {
			line.push(target);
		} else {
			line.splice(pos + 1, 0, target);
		}
	};
}

function insertCohortFactory(current, screen) {
	const insertNear = insertFactory(current, screen);
	const { line } = screen;
	return (prevNode, node) => {
		const set = new Set(node.children.map(n => n.key.model.key));
		const index = line.findIndex(n => set.has(n.key.model.key));

		if (index < 0) {
			insertNear(prevNode, node);
			return;
		}

		const target = copy(node);
		const { level } = line[index];
		target.level = level;
		line.splice(index, 0, target);

		for (let i = index + 1, end = line.length; i < end; i++) {
			const child = line[i];
			if (child.level !== level) {
				break;
			}

			if (set.has(child.key.model.key)) {
				child.level = level + 1;
			}
		}
	};
}

function everyNextIsNew(current, screen, index) {
	const { line } = current;

	let n;
	while ((n = line[++index])) {
		if (screen.set.has(n.key.model.key)) {
			return false;
		}
	}

	return true;
}
