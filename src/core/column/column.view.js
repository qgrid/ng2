import {View} from '../view';
import {columnFactory} from './column.factory';
import {AppError} from '../infrastructure';
import {merge} from '../services';
import * as columnService from '../column/column.service';
import {assignWith, noop, isUndefined} from '../services/utility';
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
					this.updateOn(generation);
					needInvalidate = true;
				}
			}
			else {
				if (e.hasChanges('columns')) {
					this.update();
					needInvalidate = true;
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

		this.update(columns);
	}

	update(generatedColumns) {
		const model = this.model;
		const data = model.data;
		let columns = Array.from(data().columns);
		const statistics = [];
		const templateColumns = model.columnList().columns;

		if (arguments.length) {
			const generatedColumnMap = columnService.map(generatedColumns);
			const templateColumnMap = columnService.map(templateColumns);
			const dataColumns = columns.filter(c => !generatedColumnMap.hasOwnProperty(c.key) && !templateColumnMap.hasOwnProperty(c.key));
			columns = generatedColumns;
			statistics.push(this.merge(columns, dataColumns));
		}

		statistics.push(this.merge(columns, templateColumns));
		if (this.hasChanges(statistics)) {
			const tag = {
				source: 'column.list',
				behavior: 'core'
			};

			data({columns: columns}, tag);
		}
	}

	merge(left, right) {
		const doMerge = merge({
			equals: (l, r) => l.key === r.key,
			update: (l, r) => assignWith(l, r, (source, target) => !isUndefined(target) && target !== null ? target : source),
			insert: (r, left) => left.push(r),
			remove: noop
		});

		return doMerge(left, right);
	}

	hasChanges(statistics) {
		return statistics.some(st => st.inserted || st.update || st.removed);
	}
}