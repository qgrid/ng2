import { AppError } from '../infrastructure/error';
import { lineView } from '../column/column.service';
import { flatView as nodeFlatView } from '../node/node.service';
import { Node } from '../node/node';

export class Scene {
	constructor(model) {
		this.model = model;
	}

	rows(memo) {
		const nodes = memo.nodes;
		const rows = memo.rows;
		if (nodes.length) {
			if (!(rows.length && rows[0] instanceof Node)) {
				return nodeFlatView(nodes);
			}
		}

		return rows;
	}

	columnRows(items) {
		return items;
	}

	columnLine(items) {
		return lineView(items);
	}

	columnArea(items) {
		const line = lineView(items);
		const result = {
			left: [],
			right: [],
			null: []
		};

		for (let i = 0, length = line.length; i < length; i++) {
			const column = line[i];
			const pin = column.model.pin;
			let area = result[pin];
			if (!area) {
				throw new AppError('scene', `Unsupported pin ${pin}`);
			}

			area.push(column);
		}

		return result;
	}
}