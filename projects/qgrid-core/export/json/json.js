import { graphFlatView } from '../export.service';

export class JsonExport {
	write(rows, columns) {
		const result = [];

		for (let row of rows) {
			const flatRow = graphFlatView(row);
			const obj = {};
			for (let column of columns) {
				obj[column.title] = flatRow[column.key];
			}
			result.push(obj);
		}

		return JSON.stringify(result, '', 2);
	}
}
