import { max } from '../../utility/kit';

export class Matrix {
    constructor(isDataRow) {
        this.isDataRow = isDataRow;
    }

    build(table) {
        const isDataRow = this.isDataRow;
        const rows = table.rows;
        const matrix = [];

        const cursor = new Array(rows.length);
        cursor.fill(0);

        let currentRow = 0;
        for (let i = 0, rowsLength = rows.length; i < rowsLength; i++) {
            const tr = rows[i];
            if (!isDataRow(tr)) {
                continue;
            }

            const cells = tr.cells;
            for (let j = 0, cellsLength = cells.length; j < cellsLength; j++) {
                const td = cells[j];

                const colSpan = td.colSpan;
                const rowSpan = td.rowSpan;

                for (let k = 0; k < rowSpan; k++) {
                    const rowIndex = currentRow + k;
                    const colIndex = cursor[rowIndex];
                    let cursorRow = matrix[rowIndex];
                    if (!cursorRow) {
                        cursorRow = [];
                        matrix[rowIndex] = cursorRow;
                    }

                    for (let m = 0; m < colSpan; m++) {
                        cursorRow[colIndex + m] = td;
                    }

                    cursor[rowIndex] = colIndex + colSpan;
                }
            }

            currentRow++;
        }

        return matrix;
    }
}