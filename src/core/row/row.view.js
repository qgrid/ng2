import { PathService } from '../path/path.service';
import { Command } from '../command/command';
import { isNumber } from '../utility/kit';
import { GRID_PREFIX } from '../definition';

export class RowView {
	constructor(model, table, tagName) {
		this.model = model;
		this.tagName = tagName;

		const pathFinder = new PathService(table.context.bag.body);

		this.drop = new Command({
			source: 'row.view',
			canExecute: e => {
				const oldIndex = e.dragData;
				const row = pathFinder.row(e.event.path);
				return !!row;
			},
			execute: e => {
				const oldIndex = e.dragData;
				const newIndex = pathFinder.row(e.event.path).index;

				if (oldIndex !== newIndex) {
					const { data } = model;
					const rows = Array.from(data().rows);

					const row = rows[oldIndex];
					rows.splice(oldIndex, 1);
					rows.splice(newIndex, 0, row);

					const oldRow = table.body.row(oldIndex);
					oldRow.removeClass(`${GRID_PREFIX}-drag`);
		
					const newRow = table.body.row(newIndex);
					newRow.addClass(`${GRID_PREFIX}-drag`);
		
					console.log(`oldIndex: ${oldIndex}, newIndex: ${newIndex}`);
					data({ rows }, { source: 'row.view' });
				}

				if (e.source === 'drop') {
					const oldRow = table.body.row(oldIndex);
					oldRow.removeClass(`${GRID_PREFIX}-drag`);
				}

				e.dragData = newIndex;
			}
		});

		this.drag = new Command({
			source: 'row.view',
			execute: e => {
				const index = e.data;
				const row = table.body.row(index);
				row.addClass(`${GRID_PREFIX}-drag`);
			},
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