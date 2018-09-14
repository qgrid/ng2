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
        const columns = this.columns;

        const { xItems, yItems } = this.retrieve(items);
        const blank = this.createBlank(xItems, yItems);

        const selectedColumns = columns.filter(column => xItems.indexOf(column.title) >= 0);
    
        const titles = selectedColumns.map(column => column.title);
        const readings = this.fillUp(blank, items, selectedColumns, yItems);
        const aggregations = selectedColumns.map(column => this.aggregation(column) === null ? '' : this.aggregation(column));
        return { titles, readings, aggregations };
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
                        const { row, column } = item.item
                        cells.push({ row, column })
                    });

                    return this.mapFromCells(cells);
                }
            }
        }
    }

    mapFromRowColumns(rows, columns) {
        const readings = [];
        const cache = new Map();

        const titles = columns.map(column => column.title);
        const aggregations = columns.map(column => this.aggregation(column) === null ? '' : this.aggregation(column));

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

            readings.push(line);
        }

        return { titles, readings, aggregations };
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
        const titles = (row, columns) => {
            let titles = [];

            for (let i = 0; i < columns.length; i++) {
                let label = get(row, columns[i]);
                titles.push(label);
            }

            return titles;
        }

        for (let y = 0; y < ids.length; y++) {
            const { rows } = this.model.view()
            const { row, column } = items[y];
            const rowIndex = rows.indexOf(row);
            const columnIndex = columns.indexOf(column);

            const cellsWithCurrentId = items.filter(item => rows.indexOf(item.row) === ids[y]);

            for (let k = 0; k < cellsWithCurrentId.length; k++) {
                const cell = cellsWithCurrentId[k];
                const { row, column } = cell;
                const label = get(row, column);
                const specificTitles = titles(row, columns);
                const x = specificTitles.indexOf(label);

                body[y][x] = label;
            }
        }

        return body;
    }

    retrieve(items) {
        const xItems = [];
        items.forEach(item => xItems.includes(item.column.title) ? null : xItems.push(item.column.title));

        const yItems = [];
        const { rows } = this.model.view();
        for (let i = 0, length = items.length; i < length; i++) {
            const { row } = items[i];
            const rowIndex = rows.indexOf(row);
            if (!yItems.includes(rowIndex)) {
                yItems.push(rowIndex);
            } 
        }
        yItems.sort();

        return { xItems, yItems };
    }

    createBlank(titles, ids) {
        const height = ids.length;
        const width = titles.length;
        const body = [];

        for (let h = 0; h < height; h++) {
            body[h] = [];

            for (let w = 0; w < width; w++) {
                body[h][w] = "";
            }
        }

        return body;
    }

    get columns() {
       return this.model.view().columns
            .filter(column => column.class === 'data' || column.class === 'pivot');
    }
}