export class ClipboardService {
	static copy(rows) {
		const table = buildTable(rows);

		selectTable(table);
	}
}

function buildTable(columns) {
	const table = document.createElement('table');
	table.classList.add('q-grid-clipboard');

	for(let i = 0, max = columns.length; i < max; i++) {
		const tr = document.createElement('tr');
		const column = columns[i];

		for(let j = 0, max = column.length; j < max; j++) {
			const td = document.createElement('td');
			td.appendChild(document.createTextNode(column[j]));
			tr.appendChild(td);
		}

		table.appendChild(tr);
	}

	document.body.appendChild(table);

	return table;
}

function selectTable(element) {
	const range = document.createRange();
	const selection = window.getSelection();

	selection.removeAllRanges();
	range.selectNodeContents(element);
	selection.addRange(range);

	document.execCommand('copy');

	const table = document.querySelector('.q-grid-clipboard');

	table.remove();
}
