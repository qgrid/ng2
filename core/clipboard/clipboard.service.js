import {isUndefined} from '../utility';

export class ClipboardService {
	static copy(selector) {
		const table = buildTable(selector);
		select(table);
		table.remove();
	}
}

function buildTable(selector) {
	const rows = selector.rows.body;
	const head = selector.rows.head;
	const foot = selector.rows.foot;
	const source = selector.source;
	const table = document.createElement('table');

	const sourceContainsHead = source.indexOf('head') >= 0;
	const sourceContainsFoot = source.indexOf('foot') >= 0;

	let allowTableHeader = true;
	let allowTableFooter = false;

	table.classList.add('q-grid-clipboard');

	for (let i = 0, rowLength = rows.length; i < rowLength; i++) {
		const tr = document.createElement('tr');
		const row = rows[i];
		const rowLast = i === rowLength - 1;

		if (rowLast) {
			allowTableFooter = true;
		}

		if (sourceContainsHead && allowTableHeader) {									//[head]
			const tr = document.createElement('tr');

			for (let h = 0, headLength = head.length; h < headLength; h++) {
				const th = document.createElement('th');

				th.appendChild(document.createTextNode(head[h]));
				tr.appendChild(th);
				table.appendChild(tr);
			}

			allowTableHeader = false;
		}

		for (let k = 0, max = row.length; k < max; k++) {								//[body]
			const td = document.createElement('td');

			td.appendChild(document.createTextNode(row[k]));
			tr.appendChild(td);
		}

		table.appendChild(tr);

		if (sourceContainsFoot && allowTableFooter) {									//[foot]
			const tr = document.createElement('tr');

			for (let f = 0, footLength = foot.length; f < footLength; f++) {
				const td = document.createElement('td');

				td.appendChild(document.createTextNode(foot[f]));
				tr.appendChild(td);
				table.appendChild(tr);
			}

			allowTableFooter = false;
		}
	}

	document.body.appendChild(table);

	return table;
}

function select(element) {
	const range = document.createRange();
	const selection = window.getSelection();

	selection.removeAllRanges();
	range.selectNodeContents(element);
	selection.addRange(range);

	document.execCommand('copy');
}
