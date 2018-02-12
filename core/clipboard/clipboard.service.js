export class ClipboardService {

	static buildTable(data) {
		const table = document.createElement('table');
		table.className = 'generatedTable';

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

	static selectTable(el) {
		let body = document.body, range, sel;

		if (document.createRange && window.getSelection) {
			range = document.createRange();
			sel = window.getSelection();
			sel.removeAllRanges();
			try {
				range.selectNodeContents(el);
				sel.addRange(range);
			} catch (e) {
				range.selectNode(el);
				sel.addRange(range);
			}
			document.execCommand('copy');

		} else if (body.createTextRange) {
			range = body.createTextRange();
			range.moveToElementText(el);
			range.select();
			range.execCommand('copy');
		}
		const table = document.querySelector('.generatedTable');

		table.remove();
	}
}

