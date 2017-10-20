import {AppError} from '../infrastructure';
import {castFactory as castAsFactory} from './cast.factory';
import {Visitor} from './expression.visitor';
import {isArray, identity} from '../utility';

export class PredicateVisitor extends Visitor {
	constructor(valueFactory) {
		super();

		this.valueFactory = valueFactory;
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
					throw  AppError(
						'predicate.visitor',
						`Invalid operation ${group.op}`
					);
			}
		}
		else {
			return this.visit(group.left);
		}
	}

	visitCondition(condition) {
		const r = condition.right;
		const name = condition.left;
		const getValue = this.valueFactory(name);
		const map = new Set();

		let rCastAs;
		if (isArray(r)) {
			if (r.length) {
				rCastAs = castAsFactory(r[0]);
				r.forEach(x => map.add(x));
			}
			else {
				rCastAs = identity;
			}
		}
		else {
			rCastAs = castAsFactory(r);
		}

		let predicate;
		switch (condition.op) {
			case 'isNotNull':
				predicate = l => l || l === 0;
				break;
			case 'isNull':
				predicate = l => !l && l !== 0;
				break;
			case 'equals':
				predicate = l => rCastAs(l) === l;
				break;
			case 'notEquals':
				predicate = l => rCastAs(l) !== l;
				break;
			case 'greaterThanOrEquals':
				predicate = l => l >= rCastAs(l);
				break;
			case 'greaterThan':
				predicate = l => l > rCastAs(l);
				break;
			case 'lessThanOrEquals':
				predicate = l => l <= rCastAs(l);
				break;
			case 'lessThan':
				predicate = l => l < rCastAs(l);
				break;
			case 'between':
				predicate = l => castAsFactory(r[0])(l) <= l && l <= castAsFactory(r[1])(l);
				break;
			case 'in':
				predicate = l => {
					const v = !l && l !== 0 ? 'null' : l;
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