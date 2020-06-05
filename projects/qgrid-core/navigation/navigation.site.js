import { selectColumnIndex } from './navigation.state.selector';
import { selectRowIndex } from './navigation.state.selector';

export class NavigationSite {
    constructor(plugin) {
        const { table, model } = plugin;

        this.table = table;
        this.model = model;
    }

    columns(rowIndex) {
        const columns = this.table.body.columns(rowIndex);
        const index = [];
        for (let i = 0, length = columns.length; i < length; i++) {
            const column = columns[i];
            if (column.model().canFocus) {
                index.push(column.index);
            }
        }
        return index;
    }

    get currentColumn() {
        const columns = this.columns(this.currentRow);
        const columnIndex = selectColumnIndex(this.model.navigation());
        const index = columns.indexOf(columnIndex);
        return columns.length ? columns[Math.max(index, 0)] : -1;
    }

    get nextColumn() {
        const columns = this.columns(this.currentRow);
        const index = columns.indexOf(this.currentColumn);
        return index >= 0 && index < columns.length - 1 ? columns[index + 1] : -1;
    }

    get prevColumn() {
        const columns = this.columns(this.currentRow);
        const index = columns.indexOf(this.currentColumn);
        return index > 0 && index < columns.length ? columns[index - 1] : -1;
    }

    get lastColumn() {
        const columns = this.columns(this.currentRow);
        const index = columns.length - 1;
        return index >= 0 ? columns[index] : -1;
    }

    get firstColumn() {
        const columns = this.columns(this.currentRow);
        return columns.length ? columns[0] : -1;
    }

    get currentRow() {
        const rowIndex = selectRowIndex(this.model.navigation());
        if (rowIndex < 0) {
            return this.table.data.rows().length ? 0 : -1;
        }

        return rowIndex;
    }

    get nextRow() {
        const row = this.currentRow + 1;
        return row <= this.lastRow ? row : -1;
    }

    get prevRow() {
        const row = this.currentRow - 1;
        return row >= 0 ? row : -1;
    }

    get firstRow() {
        return Math.min(0, this.lastRow);
    }

    get lastRow() {
        return this.table.body.rowCount(this.currentColumn) - 1;
    }
}