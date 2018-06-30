import {flatView} from '../export.service';

function updateTitles(rows, columns) {
	const result = [];
	for (let row of rows) {
		const obj = {};
		for (let column of columns) {
			obj[column.title] = row[column.key];
		}
		result.push(obj);
	}
	return JSON.stringify(result, '', 4);
}

export class Json {
	write(rows, columns) {
		const result = [];

		for (let row of rows) {
			result.push(flatView(row));
		}

		return updateTitles(result, columns);
	}
}
