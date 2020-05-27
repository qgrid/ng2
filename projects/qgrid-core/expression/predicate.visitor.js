import { GridError } from '../infrastructure/error';
import { parseFactory, getType } from '../services/convert';
import { Visitor } from './expression.visitor';
import { isArray, identity } from '../utility/kit';

export class PredicateVisitor extends Visitor {
	constructor(valueFactory, assertFactory) {
		super();

		this.valueFactory = valueFactory;
		this.assertFactory = assertFactory;
	}

	visitGroup(group) {
		if (group.right) {
			const lp = this.visit(group.left);
			const rp = this.visit(group.right);

			switch (group.op) {
				case 'and':
					return value => lp(value) && rp(value);
				case 'or':
					return value => lp(value) || rp(value);

				default:
					throw GridError(
						'predicate.visitor',
						`Invalid operation ${group.op}`
					);
			}
		}

		return this.visit(group.left);
	}

	visitCondition(condition) {
		const r = condition.right;
		const name = condition.left;
		const getValue = this.valueFactory(name);
		const assert = this.assertFactory(name);
		const map = new Set();

		const rt = getType(isArray(r) ? r[0] : r);
		let parse = parseFactory(rt);

		if (isArray(r)) {
			if (r.length) {
				r.forEach(x => map.add('' + x));
			} else {
				parse = identity;
			}
		}

		const { equals, isNull, lessThan } = assert;
		const lessThanOrEquals = (x, y) => equals(x, y) || lessThan(x, y);
		const greaterThan = (x, y) => !equals(x, y) && !lessThan(x, y);
		const greaterThanOrEquals = (x, y) => equals(x, y) || !lessThan(x, y);

		let predicate;
		switch (condition.op) {
			case 'isNotNull':
			case 'isNotEmpty':
				predicate = l => !isNull(l);
				break;
			case 'isNull':
			case 'isEmpty':
				predicate = l => isNull(l);
				break;
			case 'equals':
				predicate = l => equals(parse(l), parse(r));
				break;
			case 'notEquals':
				predicate = l => !equals(parse(l), parse(r));
				break;
			case 'greaterThanOrEquals':
				predicate = l => greaterThanOrEquals(parse(l), parse(r));
				break;
			case 'greaterThan':
				predicate = l => greaterThan(parse(l), parse(r));
				break;
			case 'lessThanOrEquals':
				predicate = l => lessThanOrEquals(parse(l), parse(r));
				break;
			case 'lessThan':
				predicate = l => lessThan(parse(l), parse(r));
				break;
			case 'between':
				predicate = l => lessThanOrEquals(parse(l), parse(r[1])) && greaterThanOrEquals(parse(l), parse(r[0]));
				break;
			case 'in':
				predicate = l => {
					const v = !l && l !== 0 ? 'null' : '' + l;
					return map.has(v);
				};
				break;
			case 'like':
				predicate = l => l && ('' + l).toLowerCase().includes(('' + r).toLowerCase());
				break;
			case 'notLike':
				predicate = l => l && !('' + l).toLowerCase().includes(('' + r).toLowerCase());
				break;
			case 'startsWith':
				predicate = l => l && (('' + l).toLowerCase().indexOf(('' + r).toLowerCase()) === 0);
				break;
			case 'endsWith':
				predicate = l => {
					const substr = ('' + l).slice(-('' + r).length).toLowerCase();
					return ('' + r).toLowerCase() === substr;
				};
				break;
			default:
				throw new GridError(
					'predicate.visitor',
					`Invalid operation ${condition.op}`
				);
		}

		return l => {
			const v = getValue(l);
			return predicate(v);
		};
	}
}
