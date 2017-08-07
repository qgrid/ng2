export class Aggregation {
	constructor() {
	}

	static first(rows, getValue) {
		if (!rows.length) {
			return null;
		}

		return getValue(rows[0]);
	}

	static last(rows, getValue) {
		if (!rows.length) {
			return null;
		}

		return getValue(rows[rows.length - 1]);
	}

	static max(rows, getValue) {
		if (!rows.length) {
			return null;
		}

		let length = rows.length;
		let i = 0;
		let max = getValue(rows[i++]);

		while (i < length) {
			if (getValue(rows[i]) > max) {
				max = getValue(rows[i]);
			}
			i++;
		}

		return max;
	}

	static min(rows, getValue) {
		if (!rows.length) {
			return null;
		}

		let length = rows.length;
		let i = 0;
		let min = getValue(rows[i++]);

		while (i < length) {
			if (getValue(rows[i]) < min) {
				min = getValue(rows[i]);
			}
			i++;
		}

		return min;
	}

	static minMax(rows, getValue) {
		if (!rows.length) {
			return null;
		}

		let length = rows.length;
		let i = 0;
		let min = getValue(rows[i++]);
		let max = min;

		while (i < length) {
			if (getValue(rows[i]) < min) {
				min = getValue(rows[i]);
			}

			if (getValue(rows[i]) > max) {
				max = getValue(rows[i]);
			}

			i++;
		}

		return [min, max];
	}

	static avg(rows, getValue, options) {
		if (!rows.length) {
			return null;
		}

		if (options.distinct) {
			let uniqueSet = new Set();
			return Aggregation.sum(rows, getValue, options, uniqueSet) / uniqueSet.size;
		}

		return Aggregation.sum(rows, getValue, options) / rows.length;
	}

	static sum(rows, getValue, options, container) {
		if (!rows.length) {
			return null;
		}

		let length = rows.length;
		let i = 0;
		let sum = 0;

		if (options.distinct) {
			let uniqueValues = container || new Set();
			let value = null;

			while (i < length) {
				value = Number(getValue(rows[i]));

				if (!uniqueValues.has(value)) {
					sum += value;
					uniqueValues.add(value);
				}

				i++;
			}

			return sum;
		}

		while (i < length) {
			sum += Number(getValue(rows[i]));
			i++;
		}

		return sum;
	}

	static join(rows, getValue, options) {
		if (!rows.length) {
			return null;
		}

		let separator = options.separator || '';
		let length = rows.length;
		let i = 0;
		let join = getValue(rows[i++]);

		if (options.distinct) {
			let uniqueValues = new Set();
			let value = join;
			uniqueValues.add(value);

			while (i < length) {
				value = getValue(rows[i]);

				if (!uniqueValues.has(value)) {
					join += separator + value;
					uniqueValues.add(value);
				}

				i++;
			}

			return join;
		}

		while (i < length) {
			join += separator + getValue(rows[i]);
			i++;
		}

		return join;
	}

	static count(rows, getValue, options) {
		if (!rows.length) {
			return null;
		}

		if (options.distinct) {
			let length = rows.length;
			let i = 0;
			let uniqueValues = new Set();
			let value = null;

			while (i < length) {
				value = Number(getValue(rows[i]));
				uniqueValues.add(value);
				i++;
			}

			return uniqueValues.size;
		}

		return rows.length;
	}

}