import {getFactory as valueFactory} from '../services/value';

const DELIMETER = ',';

function escape(value) {
	let result = '' + value;
	result = result.replace(/"/g, '""');
	result = /[\n",]/.test(result) ? `"${result}"` : result;
	return result;
}

export class Csv {
	write(rows, columns) {
		const result = [];
		const values = [];
		let head = [];
		for (let column of columns) {
			values.push(valueFactory(column));
			head.push(escape(column.title));
		}
		result.push(head.join(DELIMETER));

		for (let row of rows) {
			const line = [];
			for (let getValue of values) {
				line.push(escape(getValue(row)));
			}
			result.push(line.join(DELIMETER));
		}

		return result.join('\n');
	}
}