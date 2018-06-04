import { max } from '../../utility/kit';
import { AppError } from '../../infrastructure/error';

export class Matrix {
    constructor(isDataRow) {
        this.isDataRow = isDataRow;
    }

    build(table) {
        const mx = [];
        const offsets = [];
        const isDataRow = this.isDataRow;

        const rows = table.rows;
        let cursor = 0;
        for (let y = 0, height = rows.length; y < height; y++) {
            const tr = rows[y];
            if (!isDataRow(tr)) {
                continue;
            }

            const cells = tr.cells;
            for (let x = 0, width = cells.length; x < width; x++) {
                const td = cells[x];
                const { rowSpan, colSpan } = td;
                for (let i = 0; i < rowSpan; i++) {
                    const yi = cursor + i;
                    const row = mx.length > yi ? mx[yi] : mx[yi] = [];
                    const gaps = offsets.length > yi ? offsets[yi] : offsets[yi] = [0];
                    const offset = gaps.shift();
                    for (let j = 0; j < colSpan; j++) {
                        const xj = offset + j;
                        row[xj] = td;
                    }

                    const last = offset + colSpan;
                    if (!row[last]) {
                        gaps.push(last);
                    }
                }
            }

            cursor++;
        }

        return mx;

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