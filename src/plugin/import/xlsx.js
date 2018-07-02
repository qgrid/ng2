function rewriteObject(obj) {
	const result = {};
	for (let [key, value] of Object.entries(obj)) {
		result[key] = value;
	}
	return result;
}

export class Xlsx {
	constructor(xlsx) {
		this.xlsx = xlsx;
	}
	read(data, options) {

		const workbook = this.xlsx.read(data, {type: 'binary'});
		return this.toJson(workbook, options);
	}

	toJson(workbook, options = {}) {
		const wbOptions = {};
		switch (options.head) {
			case 'alpha': {
				wbOptions.header = 'A';
				break;
			}
			case 'numeric': {
				wbOptions.header = 1;
				break;
			}
			default: {
				break;
			}
		}
		let result = [];
		for (let sheetName of workbook.SheetNames) {
			const partial = this.xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], wbOptions);
			result = partial.concat(result);
		}

		return result.map(rewriteObject);
	}
}