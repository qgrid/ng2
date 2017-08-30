import {AppError} from '../infrastructure';
import {castFactory as castAsFactory} from './cast.factory';
import {Visitor} from './expression.visitor';

export class PredicateVisitor extends Visitor {
	constructor(valueFactory) {
		super();

		this.valueFactory = valueFactory;
	}

	visitGroup(group) {
		if (group.right) {
			const lp = this.visit(group.left),
				rp = this.visit(group.right);

			switch (group.op) {
				case 'and':
					return value => {
						return lp(value) && rp(value);
					};
				case 'or':
					return value => {
						return lp(value) || rp(value);
					};
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
		const r = condition.right,
			name = condition.left,
			getValue = this.valueFactory(name),
			castAs = castAsFactory(r);

		switch (condition.op) {
			case 'isNotNull':
				return l => {
					const v = getValue(l);
					return v || v === 0;
				};
			case 'isNull':
				return l => {
					const v = getValue(l);
					return !v && v !== 0;
				};
			case 'equals':
				return l => {
					const v = getValue(l),
						r = castAs(v);
					return v === r;
				};
			case 'notEquals':
				return l => {
					const v = getValue(l),
						r = castAs(v);
					return v !== r;
				};
			case 'greaterThanOrEquals':
				return l => {
					const v = getValue(l),
						r = castAs(v);
					return v >= r;
				};
			case 'greaterThan':
				return l => {
					const v = getValue(l),
						r = castAs(v);
					return v > r;
				};
			case 'lessThanOrEquals':
				return l => {
					const v = getValue(l),
						r = castAs(v);
					return v <= r;
				};
			case 'lessThan':
				return l => {
					const v = getValue(l),
						r = castAs(v);
					return v < r;
				};
			case 'between':
				return l => {
					const v = getValue(l);

					return castAsFactory(r[0])(v) <= v && v <= castAsFactory(r[1])(v);
				};
			case 'in':
				return l => {
					const value = getValue(l);
					const v = !value && value !== 0 ? 'null' : value;

					const map = r.reduce((memo, item) => {
						memo[castAsFactory(item)(v)] = true;
						return memo;
					}, {});

					return map.hasOwnProperty(v);
				};
			case 'like':
				return l => {
					const v = getValue(l),
						r = castAs(v);
					return v && ('' + v).toLowerCase().includes(('' + r).toLowerCase());
				};
			case 'notLike':
				return l => {
					const v = getValue(l),
						r = castAs(v);
					return v && !('' + v).toLowerCase().includes(('' + r).toLowerCase());
				};
			case 'startsWith':
				return l => {
					const v = getValue(l),
						r = castAs(v),
						substr = v.substr(0, r.length);
					return r === substr;
				};
			case 'endsWith':
				return l => {
					const v = getValue(l),
						r = castAs(v),
						substr = v.slice(-r.length);
					return r === substr;
				};
			default:
				throw new AppError(
					'predicate.visitor',
					`Invalid operation ${condition.op}`
				);
		}
	}
}