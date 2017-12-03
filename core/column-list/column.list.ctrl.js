import { View } from '../view/view';
import { clone } from '../utility';
import { compile, getType } from '../services';

export class ColumnListCtrl extends View {
	constructor(model, canCopy, parseFactory) {
		super(model);

		this.canCopy = canCopy;
		this.parseFactory = parseFactory;
	}

	copy(target, source) {
		const canCopy = this.canCopy;
		const parseFactory = this.parseFactory;

		Object.keys(source)
			.filter(key => canCopy(key, source, target))
			.forEach(key => {
				const value = source[key];
				const accessor = compile(key);
				const targetValue = accessor(target);
				const type = getType(targetValue);
				const parse = parseFactory(type);
				const sourceValue = parse(value, targetValue);
				accessor(target, sourceValue);
			});
	}

	add(column) {
		const columnList = this.model.columnList;
		const columns = columnList().columns.concat([column]); 
		columnList({ columns }, {
			source: 'column.list.ctrl',
			behavior: 'core'
		});
	}

	register(column) {
		const columnList = this.model.columnList;
		const reference = clone(columnList().columns);
		reference[column.type] = column;
		columnList({ reference }, {
			source: 'column.list.ctrl',
			behavior: 'core'
		});
	}
}
