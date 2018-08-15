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
		const length = rows.length;
		if (!length) {
			return null;
		}

		return getValue(rows[length - 1]);
	}

	static max(rows, getValue) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		let max = Number.MIN_SAFE_INTEGER;
		while (length--) {
			max = Math.max(max, getValue(rows[length]));
		}

		return max;
	}

	static min(rows, getValue) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		let min = Number.MAX_SAFE_INTEGER;
		while (length--) {
			min = Math.min(min, getValue(rows[length]));
		}

		return min;
	}

	static minMax(rows, getValue) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		let min = Number.MAX_SAFE_INTEGER;
		let max = Number.MIN_SAFE_INTEGER;
		while (length--) {
			const value = getValue(rows[length]);
			min = Math.min(min, value);
			max = Math.max(max, value);
		}

		return [min, max];
	}

	static avg(rows, getValue, options) {
		const length = rows.length;
		if (!length) {
			return null;
		}

		if (options.distinct) {
			const set = new Set();
			return Aggregation.sum(rows, getValue, options, set) / set.size;
		}

		return Aggregation.sum(rows, getValue, options) / length;
	}

	static sum(rows, getValue, options, set) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		let sum = 0;
		if (options.distinct) {
			set = set || new Set();
			while (length--) {
				const value = getValue(rows[length]);
				if (!set.has(value)) {
					sum += value;
					set.add(value);
				}
			}
		} else {
			while (length--) {
				sum += Number(getValue(rows[length]));
			}
		}

		return sum;
	}

	static join(rows, getValue, options) {
		const length = rows.length;
		if (!length) {
			return null;
		}

		let result = getValue(rows[0]);
		const separator = options.separator || '';

		if (options.distinct) {
			const set = new Set();
			let value = result;
			set.add(value);

			let i = 1;
			while (i < length) {
				value = getValue(rows[i]);

				if (!set.has(value)) {
					result += separator + value;
					set.add(value);
				}

				i++;
			}
		} else {
			let i = 1;
			while (i < length) {
				result += separator + getValue(rows[i]);
				i++;
			}
		}

		return result;
	}

	static count(rows, getValue, options) {
		let length = rows.length;
		if (!length) {
			return null;
		}

		if (options.distinct) {
			let set = new Set();
			while (length--) {
				const count = Number(getValue(rows[length]));
				set.add(count);
			}

			return set.size;
		}

		return length;
	}

}
