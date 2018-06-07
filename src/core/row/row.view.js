import { PathService } from '../path/path.service';
import { Command } from '../command/command';
import { isNumber } from '../utility/kit';

export class RowView {
	constructor(model, table, tagName) {
		this.model = model;
		this.tagName = tagName;

		this.drop = new Command({
			source: 'row.view',
			canExecute: e => {
				const oldIndex = e.dragData;
				const pathFinder = new PathService(table.context.bag.body);
				const row = pathFinder.row(e.event.path);
				return !!row;
			},
			execute: e => {
				const oldIndex = e.dragData;
				const pathFinder = new PathService(table.context.bag.body);
				const newIndex = pathFinder.row(e.event.path).index;

				if (oldIndex !== newIndex) {
					const { data } = model;
					const rows = Array.from(data().rows);

					const row = rows[oldIndex];
					rows.splice(oldIndex, 1);
					rows.splice(newIndex, 0, row);

					data({ rows });
				}

				return newIndex;
			}
		});

		this.drag = new Command({
			source: 'row.view',
			canExecute: e => {
				if (isNumber(e.data)) {
					const index = e.data;
					return index >= 0 && model.view().rows.length > index;
				}

				return false;
			}
		});

		this.resize = new Command({
			source: 'row.view'
		});
	}

	get canMove() {
		return this.model.row().canMove;
	}

	get canResize() {
		return this.model.row().canResize;
	}
}