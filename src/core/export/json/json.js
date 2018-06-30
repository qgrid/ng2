import { flatView } from '../export.service';

export class Json {
	write(rows, columns) {
		const result = [];

		for (let row of rows) {
			const rowObj = flatView(row);
			const obj = {};
			for (let column of columns) {
				obj[ column.title ] = rowObj[ column.key ];
			}
			result.push(obj);
		}

		return JSON.stringify(result, '', 4);
	}
}
