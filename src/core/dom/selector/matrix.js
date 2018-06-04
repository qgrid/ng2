import { max } from '../../utility/kit';
import { AppError } from '../../infrastructure/error';

export class Matrix {
    constructor(isDataRow) {
        this.isDataRow = isDataRow;
    }

    build(table) {
        const isDataRow = this.isDataRow;
        const rows = table.rows;
        const offset = new Array(rows.length);
        const matrix = [];

        let cursor = 0;
        for (let i = 0, height = rows.length; i < height; i++) {
            const tr = rows[i];
            if (!isDataRow(tr)) {
                continue;
            }

            const cells = tr.cells;
            for (let j = 0, width = cells.length; j < width; j++) {
                const td = cells[j];
                const { colSpan, rowSpan } = td;

                for (let y = 0; y < rowSpan; y++) {
                    const yi = cursor + y;
                    const xi = offset[yi] || 0;
                    let row = matrix[yi];
                    if (!row) {
                        row = [];
                        matrix[yi] = row;
                    }

                    for (let x = 0; x < colSpan; x++) {
                        row[xi + x] = td;
                    }

                    offset[yi] = xi + colSpan;
                }
            }

            cursor++;
        }

        // this.assertFlatness(matrix);
        return matrix;
    }

    assertFlatness(matrix) {
        if (matrix.length) {
            const height = matrix.length;
            const width = matrix[0].length;
            for (let i = 1; i < height; i++) {
                if (matrix[i].length !== width) {
                    throw new AppError(
                        'matrix', 
                        `Matrix is not flat, expect width ${width}, actual ${matrix[i].length}`);
                }
            }
        }
    }
}