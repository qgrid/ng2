export class ClipboardService {
	static copy(rows) {
		const table = buildTable(rows);

		selectTable(table);
	}
}

function buildTable(columns) {
	const table = document.createElement('table');
	table.classList.add('q-grid-clipboard');

	columns.forEach((column) => {
		const tr = document.createElement('tr');
		for (let index in column) {
			const td = document.createElement('td');
			td.appendChild(document.createTextNode(column[index]));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	});

	document.body.appendChild(table);

	return table;
}

function selectTable(element) {
	let range, selection;

	range = document.createRange();
	selection = window.getSelection();

	selection.removeAllRanges();
	range.selectNodeContents(element);
	selection.addRange(range);

	document.execCommand('copy');

	const table = document.querySelector('.q-grid-clipboard');

	table.remove();
}
