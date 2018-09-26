import { AppError } from '../infrastructure/error';
import { get } from '../services/value';
import { isUndefined } from '../utility/kit';
import { Aggregation } from '../services/aggregation';
import { getFactory as valueFactory } from '../services/value';

export class RowSelector {
    constructor(model) {
        this.model = model;
        this.source = this.model.clipboard().source;
        this.mode = this.model.selection().mode;
        this.view = this.model.view();
    }

    map(items) {
        const selectionState = this.model.selection();

        switch (selectionState.unit) {
            case 'row':
                return this.mapFromRows(items);
            case 'column':
                return this.mapFromColumns(items);
            case 'cell':
                return this.mapFromCells(items);
            case 'mix':
                return this.mapFromMix(items);
            default:
                throw new AppError('row.selector', `Invalid unit ${selectionState.unit}`);
        }
    }

    mapFromRows(rows) {
        const columns = this.columns;

        return this.mapFromRowColumns(rows, columns);
    }

    mapFromColumns(columns) {
        const rows = this.model.view().rows;

        return this.mapFromRowColumns(rows, columns);
    }

	mapFromCells(items) {
		const { titles, ids } = this.retrieve(items);
		const blank = this.createBlank(titles, ids);

		const columns = this.columns;
		const selectedColumns = columns.filter(column => titles.includes(column.title));

		const head = selectedColumns.map(column => column.title);
		const body = this.fillUp(blank, items, selectedColumns, ids);
		const foot = selectedColumns.map(column => this.aggregation(column) === null ? '' : this.aggregation(column));
		return { head, body, foot };
	}

    mapFromMix(items) {
        for (const item of items) {
            switch (item.unit) {
                case 'row': {
                    const row = item.item;
                    return this.mapFromRows([row]);
                }
                case 'cell': {
                    const cells = [];
                    items.forEach(item => {
                        const { row, column } = item.item;
                        cells.push({ row, column });
                    });

                    return this.mapFromCells(cells);
                }
            }
        }
    }

    mapFromRowColumns(rows, columns) {
        const body = [];
        const cache = new Map();

        const head = columns.map(column => column.title);
        const foot = columns.map(column => this.aggregation(column) === null ? '' : this.aggregation(column));

        for (const row of rows) {
            const line = [];

            for (const column of columns) {
                let label;
                const { key } = column;

                if (cache.has(key)) {
                    label = cache.get(key)
                } else {
                    label = valueFactory(column);
                    cache.set(key, label);
                }

                const value = label(row);
                line.push(value === null || isUndefined(value) ? '' : '' + value);
            }

            body.push(line);
        }

        return { head, body, foot };
    }

    aggregation(column) {
        if (column.aggregation) {
            const { aggregation } = column;
            const { aggregationOptions } = column;

            if (!Aggregation.hasOwnProperty(aggregation)) {
                throw new AppError(
                    'row.selector',
                    `Aggregation ${aggregation} is not registered`);
            }

            const { rows } = this.model.data();
            const getValue = valueFactory(column);

            return Aggregation[aggregation](rows, getValue, aggregationOptions);
        }
        return null;
    }

	fillUp(body, items, columns, ids) {
		const getTitles = (row, columns) => {
			let titles = [];

			for (let i = 0; i < columns.length; i++) {
				let label = get(row, columns[i]);
				titles.push(label);
			}

			return titles;
		};

		const rows = this.rows;
		for (let y = 0; y < ids.length; y++) {
			const cells = items.filter(item => rows.indexOf(item.row) === ids[y]);

			for (let k = 0; k < cells.length; k++) {
				const cell = cells[k];
				const {row, column} = cell;
				const label = get(row, column);
				const currentRowTitles = getTitles(row, columns);
				const x = currentRowTitles.indexOf(label);

				body[y][x] = label ;
			}
		}

		return body;
	}

	retrieve(items) {
		const titles = [];
		const ids = [];
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (!titles.includes(item.column.title)) {
				titles.push(item.column.title);
			}

			const {row} = item;
			const index = this.rows.indexOf(row);
			if (!ids.includes(index)) {
				ids.push(index);
			}
		}
		ids.sort();

		return {titles, ids};
	}

	createBlank(titles, ids) {
		const height = ids.length;
		const width = titles.length;
		const body = [];

		for (let h = 0; h < height; h++) {
			body[h] = [];

			for (let w = 0; w < width; w++) {
				body[h][w] = '';
			}
		}

		return body;
	}

    get columns() {
       return this.model.view().columns
            .filter(column => column.class === 'data' || column.class === 'pivot');
    }

    get rows() {
    	return this.model.view().rows;
	}
}
