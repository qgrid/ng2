import {flatView} from '../export.service';

function updateTitles(rows, titles) {
	const result = [];
	for (let row of rows) {
		const obj = {};
		const values = Object.values(row);
		for (let i = 0; i < titles.length; i++) {
			obj[titles[i]] = values[i];
		}
		result.push(obj);
	}
	return JSON.stringify(result, '', 4);
}

export class Json {
	write(rows, columns) {
		const titles = [];
		const result = [];

		for (let row of rows) {
			result.push(flatView(row));
		}
		for (let column of columns) {
			titles.push(column.title);
		}

		return updateTitles(result, titles);
	}
}