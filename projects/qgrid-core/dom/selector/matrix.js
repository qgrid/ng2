import { binarySearch } from '../../utility/kit';
import { GridError } from '../../infrastructure/error';

export class Matrix {
    constructor(isDataRow) {
        this.isDataRow = isDataRow;
    }

    build(table) {
        const rows = table.rows;
        const isDataRow = this.isDataRow;

        const mx = [];
        const offsets = [];

        let y = 0;
        for (let cursor = 0, height = rows.length; cursor < height; cursor++) {
            const tr = rows[cursor];
            if (!isDataRow(tr)) {
                continue;
            }

            const offset = offsets.length > y ? offsets[y] : offsets[y] = [0];
            const cells = tr.cells;
            for (let x = 0, width = cells.length; x < width; x++) {
                const td = cells[x];
                const { rowSpan, colSpan } = td;
                const current = offset[0];
                const next = current + colSpan;
                for (let i = 0; i < rowSpan; i++) {
                    const yi = y + i;
                    const row = mx.length > yi ? mx[yi] : mx[yi] = [];
                    for (let j = 0; j < colSpan; j++) {
                        const xj = current + j;
                        row[xj] = td;
                    }

                    const gaps = offsets.length > yi ? offsets[yi] : offsets[yi] = [0];
                    const index = binarySearch(gaps, current);
                    if (row[next]) {
                        gaps.splice(index, 1);
                    }
                    else {
                        const xi = gaps[index];
                        gaps.splice(index, row[xi] ? 1 : 0, next);
                    }
                }
            }
            y++;
        }

        return mx;
    }

    assertFlatness(matrix) {
        if (matrix.length) {
            const height = matrix.length;
            const width = matrix[0].length;
            for (let i = 1; i < height; i++) {
                if (matrix[i].length !== width) {
                    throw new GridError(
                        'matrix',
                        `Matrix is not flat, expect width ${width}, actual ${matrix[i].length}`);
                }
            }
        }
    }
}