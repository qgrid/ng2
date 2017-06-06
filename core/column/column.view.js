import {View} from '../view';
import {columnFactory} from './column.factory';
import {AppError} from '../infrastructure';
import {merge} from '../services';
import {assignWith, noop, isUndefined} from '../utility';
import {generate} from '../column-list';
import {PipeUnit} from '../pipe/units';

export class ColumnView extends View {
	constructor(model, service) {
		super(model);

		const factory = columnFactory(model);

		// this should be first place(with column.pipe) where columns are processed
		model.dataChanged.watch(e => {
			if (e.tag.source === 'column.list') {
				return;
			}

			let needInvalidate = false;
			if (e.hasChanges('columns')) {
				e.state.columns.forEach(c => factory(c.type || 'text', c));
			}

			const generation = model.columnList().generation;
			if (generation) {
				if (e.hasChanges('rows')) {
					needInvalidate = this.updateOn(generation);
				}
			}
			else {
				if (e.hasChanges('columns')) {
					needInvalidate = this.update();
				}
			}

			if (needInvalidate) {
				service.invalidate('column.view', e.changes, PipeUnit.column);
			}
		});

		model.columnListChanged.watch(e => {
			if (e.hasChanges('columns')) {
				this.update();
				service.invalidate('column.view', e.changes, PipeUnit.column);
			}
		});
	}

	updateOn(generation) {
		const model = this.model;
		const data = model.data;

		const columns = [];
		const createColumn = columnFactory(model);
		const rows = data().rows;
		switch (generation) {
			case 'deep':
				columns.push(...generate(rows, createColumn, true));
				break;
			case 'shallow':
				columns.push(...generate(rows, createColumn, false));
				break;
			default:
				throw new AppError(
					'column.list',
					`Invalid generation mode "${generation}"`
				);
		}

		return this.update(columns);
	}

	update(generatedColumns) {
		const model = this.model;
		const data = model.data;
		const dataColumns = Array.from(data().columns);
		const statistics = [];
		const templateColumns = model.columnList().columns;

		if (arguments.length) {
			statistics.push(this.merge(dataColumns, generatedColumns, false));
		}

		statistics.push(this.merge(dataColumns, templateColumns, true));
		if (this.hasChanges(statistics)) {
			const tag = {
				source: 'column.list',
				behavior: 'core'
			};

			data({columns: dataColumns}, tag);
			return true;
		}

		return false;
	}

	merge(left, right, force = false) {
		let canAssign;
		if (force) {
			canAssign = (source, target) => !isUndefined(target) && target !== null ? target : source;
		}
		else {
			canAssign = (source, target) => !isUndefined(target) && target !== null && source === null ? target : source;
		}

		const doMerge = merge({
			equals: (l, r) => l.key === r.key,
			update: (l, r) => assignWith(l, r, canAssign),
			insert: (r, left) => left.push(r),
			remove: noop
		});

		return doMerge(left, right);
	}

	hasChanges(statistics) {
		return statistics.some(st => st.inserted || st.update);
	}
}