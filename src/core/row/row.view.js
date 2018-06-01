import { PathService } from '../path/path.service';
import { Command } from '../command/command';
import { isNumber } from '../utility/kit';

export class RowView {
	constructor(model, table, tagName) {
		this.model = model;
		this.tagName = tagName;

		let oldIndex = -1;

		this.drop = new Command({
			source: 'row.view',
			canExecute: e => {
				const newIndex = e.target;
				if (isNumber(oldIndex) && isNumber(newIndex)) {
					const { rows } = model.view();
					return oldIndex !== newIndex
						&& oldIndex >= 0
						&& newIndex >= 0
						&& rows.length > oldIndex
						&& rows.length > newIndex;
				}

				return false;

			},
			execute: e => {
				const newIndex = e.target;
				const { data } = model;
				const rows = Array.from(data().rows);
				const row = rows[oldIndex];
				rows.splice(oldIndex, 1);
				rows.splice(newIndex, 0, row);

				data({ rows });
			}
		});

		this.dragOver = new Command({
			source: 'row.view',
			canExecute: e => {
				const pathFinder = new PathService(table.context.bag.body);
				const row = pathFinder.row(e.path);
				return !!row;
			},
			execute: e => {
				const pathFinder = new PathService(table.context.bag.body);
				const newIndex = pathFinder.row(e.path).index;
				//return row.index;

				const { data } = model;
				const rows = Array.from(data().rows);
				const row = rows[oldIndex];
				rows.splice(oldIndex, 1);
				rows.splice(newIndex, 0, row);

				data({ rows });
				
				oldIndex = newIndex
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
			},
			execute: e => oldIndex = e.data
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