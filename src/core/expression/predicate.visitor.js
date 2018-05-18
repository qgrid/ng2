import { AppError } from '../infrastructure/error';
import { castFactory as castAsFactory } from './cast.factory';
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
					throw AppError(
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

		let rCastAs;
		if (isArray(r)) {
			if (r.length) {
				rCastAs = castAsFactory(r[0]);
				r.forEach(x => map.add('' + x));
			} else {
				rCastAs = identity;
			}
		} else {
			rCastAs = castAsFactory(r);
		}

		const equals = assert.equals;
		const isNull = assert.isNull;
		const lessThan = assert.lessThan;
		const lessThanOrEquals = (x, y) => equals(x, y) || lessThan(x, y);
		const greaterThan = (x, y) => !lessThanOrEquals(x, y);
		const greaterThanOrEquals = (x, y) => !lessThan(x, y);

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
				predicate = l => equals(rCastAs(l), l);
				break;
			case 'notEquals':
				predicate = l => !equals(rCastAs(l), l);
				break;
			case 'greaterThanOrEquals':
				predicate = l => greaterThanOrEquals(l, rCastAs(l));
				break;
			case 'greaterThan':
				predicate = l => greaterThan(l, rCastAs(l));
				break;
			case 'lessThanOrEquals':
				predicate = l => lessThanOrEquals(l, rCastAs(l));
				break;
			case 'lessThan':
				predicate = l => lessThan(l, rCastAs(l));
				break;
			case 'between':
				predicate = l => lessThanOrEquals(castAsFactory(r[0])(l), l) && greaterThanOrEquals(castAsFactory(r[1])(l), l);
				break;
			case 'in':
				predicate = l => {
					const v = !l && l !== 0 ? 'null' : '' + l;
					return map.has(v);
				};
				break;
			case 'like':
				predicate = l => {
					const r = rCastAs(l);
					return l && ('' + l).toLowerCase().includes(('' + r).toLowerCase());
				};
				break;
			case 'notLike':
				predicate = l => {
					const r = rCastAs(l);
					return l && !('' + l).toLowerCase().includes(('' + r).toLowerCase());
				};
				break;
			case 'startsWith':
				predicate = l => {
					const r = rCastAs(l);
					const substr = l.substr(0, r.length).toLowerCase();
					return ('' + r).toLowerCase() === substr;
				};
				break;
			case 'endsWith':
				predicate = l => {
					const r = rCastAs(l);
					const substr = l.slice(-r.length).toLowerCase();
					return ('' + r).toLowerCase() === substr;
				};
				break;
			default:
				throw new AppError(
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