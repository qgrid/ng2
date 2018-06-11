import { identity } from "../utility/kit";

export function sortFactory(model) {
    const { index } = model.rowList();
    if (!index.size) {
        return identity;
    }

    const { id } = model.data();
    return rows => {
        let cursor = 0;
        const positions = new Map();
        return rows
            .filter((row, i) => {
                const key = id.row(i, row);
                const position = index.get(key)
                if (position || position === 0) {
                    positions.set(position, row);
                    return false;
                }

                return true;
            })
            .reduce((memo, row) => {
                let indexRow;
                while (indexRow = positions.get(cursor)) {
                    memo.push(indexRow)
                    cursor++;
                }

                memo.push(row);
                cursor++;

                return memo;
            }, []);
    };
}