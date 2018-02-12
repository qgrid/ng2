export class ClipboardService {

	static buildTable(data) {
		const table = document.createElement('table');
		table.classList.add('q-grid-generated-table');

		data.forEach((el) => {
			const tr = document.createElement('tr');
			for (let o in el) {
				const td = document.createElement('td');
				td.appendChild(document.createTextNode(el[o]));
				tr.appendChild(td);
			}
			table.appendChild(tr);
		});

		document.body.appendChild(table);

		return table;
	}

	static selectTable(element) {
		let range, selection;

		range = document.createRange();
		selection = window.getSelection();

		selection.removeAllRanges();
		range.selectNodeContents(element);
		selection.addRange(range);

		document.execCommand('copy');

		const table = document.querySelector('.q-grid-generated-table');

		table.remove();
	}
}

