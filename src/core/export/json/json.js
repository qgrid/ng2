import { flatView } from '../export.service';

export class Json {
	write(rows, columns) {
		const result = [];

		for (let row of rows) {
			const flatRow = flatView(row);
			const obj = {};
			for (let column of columns) {
				obj[column.title] = flatRow[column.key];
			}
			result.push(obj);
		}

		return JSON.stringify(result, '', 2);
	}
}
