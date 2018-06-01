import { max } from '../../utility/kit';

export class Matrix {
    constructor(table) {
        this.table = table;
        this.rowspans = {};
    }

    build() {
        const rows = this.table.rows;
        const rowsCount = rows.length;
        const result = [];
        const rowSpans = {};

        for (let i = 0; i < rowsCount; i++) {
            const rowElement = rows[i];
            if (rowElement.classList.contains('q-grid-align')) {
                continue;
            }
            const row = this.populateRow(rowElement);
            result.push(row);
        }

        return result;
    }

    populateRow(row) {
        const cells = row.cells;
        const cellsCount = cells.length;
        const result = {
            row,
            cells: []
        };

        for (let i = 0; i < cellsCount; i++) {
            const currentCell = cells[i];
            const rowspan = currentCell.rowSpan || 1;
            let colSpan = currentCell.colSpan || 1;

            if (this.rowspans[i] && this.rowspans[i].span) {
                this.rowspans[i].span--;
                this.addCell(result, this.rowspans[i].cell);
            }

            if (rowspan > 1) {
                this.rowspans[i] = {
                    cell: currentCell,
                    span: rowspan - 1
                };
            }

            this.addCell(result, currentCell);
        }

        return result;
    }

    addCell(row, cell) {
        let colSpan = cell.colSpan || 1;

        while (colSpan--) {
            row.cells.push(cell);
        }
    }
}