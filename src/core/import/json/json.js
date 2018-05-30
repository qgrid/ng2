import { isArray } from '../../utility/kit';

export class Json {
	read(data) {
		const rows = JSON.parse(data);
		if (isArray(rows)) {
			return rows;
		}
		return [rows];
	}
}