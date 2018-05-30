import {assignWith} from '../utility/kit';

export function merge(settings) {
	const context = assignWith({
		equals: (l, r) => l === r,
		update: (l, r /*left, i*/) => {
			assignWith(l, r);
			return l;
		},
		remove: (l, left, i) => {
			left.splice(i, 1);
			return l;
		},
		insert: (r, left) => {
			left.push(r);
			return r;
		}
	}, settings);

	return (left, right, result) => {
		const ls = left.slice();
		const rs = right.slice();
		let updated = 0;
		let removed = 0;

		result = result || left;
		for (let i = 0, lsLength = ls.length; i < lsLength; i++) {
			const l = ls[i];
			let matched = false;
			for (let j = 0, rsLength = rs.length; j < rsLength; j++) {
				const r = rs[j];
				if (context.equals(l, r, i, j)) {
					context.update(l, r, result, result.indexOf(l));
					updated++;
					matched = true;
					rs.splice(j, 1);
					break;
				}
			}

			if (!matched) {
				context.remove(l, result, result.indexOf(l));
				removed++;
			}
		}

		const inserted = rs.length;
		for (let i = 0; i < inserted; i++) {
			context.insert(rs[i], result);
		}

		if (context.sort) {
			left.sort(context.sort(left, right));
		}

		return {updated, removed, inserted};
	};
}