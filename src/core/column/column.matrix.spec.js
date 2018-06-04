import { expand, collapse } from './column.matrix';

describe('column matrix', () => {

	const col = (key, rowspan, colspan) => ({
		key: key,
		rowspan: rowspan,
		colspan: colspan
	});

	const lineKeyFactory = line => i => line[i].key;
	const viewKeyFactory = view => (i, j) => view[i][j].key;

	const columnRows = [
		[col('A', 1, 1), col('B', 1, 2), col('C', 3, 1)],
		[col('D', 3, 1), col('E', 1, 2)],
		[col('F', 2, 1), col('G', 1, 1)],
		[col('H', 1, 2)],
	];

	describe('expand', () => {
		const view = expand(columnRows);
		const key = viewKeyFactory(view);

		const etalonView = [
			['A', 'B', 'B', 'C'],
			['D', 'E', 'E', 'C'],
			['D', 'F', 'G', 'C'],
			['D', 'F', 'H', 'H'],
		];

		for (let i = 0; i < etalonView.length; i++) {
			const etalonRow = etalonView[i];
			for (let j = 0; j < etalonRow.length; j++) {
				expect(key(i, j)).to.equals(etalonRow[j]);
			}
		}
	});

	describe('collapse', () => {
		const view = expand(columnRows);
		const line = collapse(view);
		const key = lineKeyFactory(line);
		expect(line.length).to.equals(3)
		expect(key(0)).to.equals('D');
		expect(key(1)).to.equals('F');
		expect(key(2)).to.equals('H');
	});
});