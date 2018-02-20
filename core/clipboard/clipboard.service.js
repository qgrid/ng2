import {isUndefined} from '../utility';

export class ClipboardService {
	static copy(rows, head, foot) {
		const table = buildTable(rows, head, foot);
		select(table);
		table.remove();
	}
}

function buildTable(rows, head, foot) {
	const table = document.createElement('table');
	table.classList.add('q-grid-clipboard');
	let headFlag = true;
	let footFlag = false;

	for (let i = 0, rowLength = rows.length; i < rowLength; i++) {
		const tr = document.createElement('tr');
		const row = rows[i];

		if (i === rowLength - 1) {
			footFlag = true;
		}

		if (head && headFlag) {
			const tr = document.createElement('tr');

			for (let h = 0, headLength = head.length; h < headLength; h++) {
				const th = document.createElement('th');

				th.appendChild(document.createTextNode(head[h]));
				tr.appendChild(th);
				table.appendChild(tr);
			}

			headFlag = false;
		}

		for (let k = 0, max = row.length; k < max; k++) {
			const td = document.createElement('td');

			td.appendChild(document.createTextNode(row[k]));
			tr.appendChild(td);
		}

		table.appendChild(tr);

		if (foot && footFlag) {
			const tr = document.createElement('tr');

			for (let f = 0, footLength = foot.length; f < footLength; f++) {
				const td = document.createElement('td');

				td.appendChild(document.createTextNode(foot[f]));
				tr.appendChild(td);
				table.appendChild(tr);
			}

			footFlag = false;
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
