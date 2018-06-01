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
				const pathFinder = new PathService(table.context.bag.body);
				const row = pathFinder.row(e.event.path);
				return !!row;
			},
			execute: e => {
				const pathFinder = new PathService(table.context.bag.body);
				const oldIndex = e.dragData;
				const newIndex = pathFinder.row(e.event.path).index;

				const { data } = model;
				const rows = Array.from(data().rows);

				const row = rows[oldIndex];
				rows.splice(oldIndex, 1);
				rows.splice(newIndex, 0, row);

				data({ rows });
				
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
			source: 'row.view',
			canExecute: e => {
				if (e.source && e.source.key === tagName) {
					const rows = model.data().rows;
					const index = rows.indexOf(e.source.value);
					return index >= 0;
				}

				return false;
			}
		});
	}

	get canMove() {
		return this.model.row().canMove;
	}

	get canResize() {
		return this.model.row().canResize;
	}
}