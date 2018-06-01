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

            this.populateSpan(i, result);
            this.addRowspan(currentCell, i, rowspan);

            this.addCell(result, currentCell);
        }

        return result;
    }

    addRowspan(cell, index, rowspan) {
        if (rowspan > 1) {
            const spans = this.rowspans[index] || (this.rowspans[index] = []);

            spans.push({
                cell,
                span: rowspan - 1
            });
        }
    }

    populateSpan(index, result) {
        const spanning = this.rowspans[index];
        if (spanning) {
            spanning.forEach(span => {
                if (span.span) {
                    this.addCell(result, span.cell);
                    span.span--;
                }
            });
        }
    }

    addCell(row, cell) {
        let colSpan = cell.colSpan || 1;

        while (colSpan--) {
            row.cells.push(cell);
        }
    }
}