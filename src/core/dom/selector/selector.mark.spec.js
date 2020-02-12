import { Range } from '../../infrastructure/range';
import { SelectorMark } from './selector.mark';
import { modelFactory } from '../../test/model.factory';
import { ColumnModel } from '../../column-type/column.model';

describe('SelectorFactory', () => {
	const column1 = new ColumnModel();
	column1.pin = 'grid';
	const column2 = new ColumnModel();
	column2.pin = 'left';
	const column3 = new ColumnModel();
	column3.pin = 'grid';
	const column4 = new ColumnModel();
	column4.pin = 'right';
	const column5 = new ColumnModel();
	column5.pin = null;

	const model = modelFactory();
	model
		.scene({
			rows: ['row1', 'row2', 'row3'],
			column: {
				rows: [],
				line: [],
				area: {
					left: [column2],
					null: [column5],
					right: [column4],
					grid: [column1, column3]
				}
			}
		});
	const name = 'q';
	const markup = {
		'q': 'q',
		'q-grid': 'q-grid',
		'q-left': 'q-left',
		'q-right': 'q-right'
	};
	const cell = {
		element: 'cell',
		columnRange: new Range(1, 4),
		rowRange: new Range(0, 3)
	};

	const selectorMark = new SelectorMark(model, markup, name);

	describe('addFactory', () => {
		it('should add new cell to the existing array of cells', () => {
			const test = {
				element: 'q-grid',
				columnRange: new Range(4, 6),
				rowRange: new Range(0, 3)
			};
			const result = [cell];
			const factory = selectorMark.addFactory(result);
			const cells = factory('grid');
			expect(cells).to.be.an.instanceOf(Array).and.to.have.lengthOf(2);
			expect(JSON.stringify(cells[0])).to.equal(JSON.stringify(cell));
			expect(JSON.stringify(cells[1])).to.equal(JSON.stringify(test));
		});
		it('if markup element was not found, than returns initial array of cells', () => {
			const result = [cell];
			const factory = selectorMark.addFactory(result);
			const cells = factory('notExistingElement');
			expect(cells).to.be.an.instanceOf(Array).and.to.have.lengthOf(1);
			expect(JSON.stringify(cells[0])).to.equal(JSON.stringify(cell));
		});
	});

	describe('select', () => {
		it('should return array of cells', () => {
			const leftCell = {
				element: 'q-left',
				columnRange: new Range(0, 1),
				rowRange: new Range(0, 3)
			};
			const rightCell = {
				element: 'q-right',
				columnRange: new Range(2, 3),
				rowRange: new Range(0, 3)
			};
			const optional = {
				element: 'q',
				columnRange: new Range(1, 2),
				rowRange: new Range(0, 3)
			};
			const cells = selectorMark.select();
			expect(cells).to.be.an.instanceOf(Array).and.to.have.lengthOf(3);
			expect(JSON.stringify(cells[0])).to.equal(JSON.stringify(leftCell));
			expect(JSON.stringify(cells[1])).to.equal(JSON.stringify(optional));
			expect(JSON.stringify(cells[2])).to.equal(JSON.stringify(rightCell));
		});
	});
});
