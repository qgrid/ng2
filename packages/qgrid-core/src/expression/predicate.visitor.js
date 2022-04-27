import { GridError } from '../infrastructure/error';
import { compareParseFactory } from '../services/convert';
import { identity, isArray, isUndefined, yes } from '../utility/kit';
import { Visitor } from './expression.visitor';

export class PredicateVisitor extends Visitor {
	constructor(valueFactory, assertFactory, getType) {
		super();

		this.valueFactory = valueFactory;
		this.assertFactory = assertFactory;
		this.getType = getType;
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
						`Invalid operation ${group.op}`,
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

		const rt = this.getType(name, isArray(r) ? r[0] : r);
		let parse = compareParseFactory(rt);

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
				predicate = actual => !isNull(actual);
				break;
			case 'isNull':
			case 'isEmpty':
				predicate = actual => isNull(actual);
				break;
			case 'equals': {
				const etalon = parse(r);
				predicate = actual => equals(parse(actual), etalon);
				break;
			}
			case 'notEquals': {
				const etalon = parse(r);
				predicate = actual => !equals(parse(actual), etalon);
				break;
			}
			case 'greaterThanOrEquals': {
				const etalon = parse(r);
				predicate = actual => greaterThanOrEquals(parse(actual), etalon);
				break;
			}
			case 'greaterThan': {
				const etalon = parse(r);
				predicate = actual => greaterThan(parse(actual), etalon);
				break;
			}
			case 'lessThanOrEquals': {
				const etalon = parse(r);
				predicate = actual => lessThanOrEquals(parse(actual), etalon);
				break;
			}
			case 'lessThan': {
				const etalon = parse(r);
				predicate = actual => lessThan(parse(actual), etalon);
				break;
			}
			case 'between': {
				const [start, end] = r;
				const noStart = isUndefined(start);
				const noEnd = isUndefined(end);
				if (noStart && noEnd) {
					predicate = yes;
					break;
				}

				if (noEnd) {
					const etalon = parse(start);
					predicate = actual => greaterThanOrEquals(parse(actual), etalon);
					break;
				}

				if (noStart) {
					const etalon = parse(end);
					predicate = actual => lessThanOrEquals(parse(actual), etalon);
					break;
				}

				const etalonStart = parse(start);
				const etalonEnd = parse(end);
				predicate = actual => {
					const actualValue = parse(actual);
					return greaterThanOrEquals(actualValue, etalonStart)
						&& lessThanOrEquals(actualValue, etalonEnd);
				};

				break;
			}
			case 'in': {
				predicate = actual => {
					if (isArray(actual)) {
						for (const value of map) {
							if (actual.some(item => '' + item === value)) {
								return true;
							}
						}
						return false;
					}

					const v = !actual && actual !== 0 ? 'null' : '' + actual;
					return map.has(v);
				};
				break;
			}
			case 'like': {
				const etalon = ('' + r).toLowerCase();
				predicate = actual => actual && ('' + actual).toLowerCase().includes(etalon);
				break;
			}
			case 'notLike': {
				const etalon = ('' + r).toLowerCase();
				predicate = actual => actual && !('' + actual).toLowerCase().includes(etalon);
				break;
			}
			case 'startsWith': {
				const etalon = ('' + r).toLowerCase();
				predicate = actual => actual && (('' + actual).toLowerCase().indexOf(etalon) === 0);
				break;
			}
			case 'endsWith': {
				const etalon = ('' + r).toLowerCase();
				predicate = actual => {
					const substr = ('' + actual).slice(-etalon.length).toLowerCase();
					return etalon === substr;
				};
				break;
			}
			default:
				throw new GridError(
					'predicate.visitor',
					`Invalid operation ${condition.op}`,
				);
		}

		return row => {
			const actual = getValue(row);
			return predicate(actual);
		};
	}
}
