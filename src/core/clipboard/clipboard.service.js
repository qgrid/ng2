import { isUndefined } from '../utility/kit';

export class ClipboardService {
	static copy(context) {
		const table = createTable(context);
		select(table);
		table.remove();
	}
}

function createTable(context) {
	const { head, body, foot } = context.area;
	const { source } = context;
	const table = document.createElement('table');

	const gotTitles = source.indexOf('head') >= 0;
	const gotAggregations = source.indexOf('foot') >= 0;

	let titleFlag = true;
	let aggregationFlag = false;

	for (let i = 0, rowLength = body.length; i < rowLength; i++) {
		const tr = document.createElement('tr');
		const row = body[i];
		const last = i === rowLength - 1;

		if (last) {
			aggregationFlag = true;
		}

		if (gotTitles && titleFlag) {
			const tr = createPart(head, 'th');
			table.appendChild(tr);
			titleFlag = false;
		}

		for (let k = 0, max = row.length; k < max; k++) {
			const td = document.createElement('td');
			td.appendChild(document.createTextNode(row[k]));
			tr.appendChild(td);
		}

		table.appendChild(tr);

		if (gotAggregations && aggregationFlag) {
			const tr = createPart(foot, 'td');
			table.appendChild(tr);
			aggregationFlag = false;
		}
	}

	table.classList.add('q-grid-clipboard');
	document.body.appendChild(table);

	return table;
}

function createPart(rows, tag) {
	const tr = document.createElement('tr');

	for (let i = 0; i < rows.length; i++) {
		const el = document.createElement(tag);
		el.appendChild(document.createTextNode(rows[i]));
		tr.appendChild(el);
	}

	return tr;
}

function addSection(table, section) {
	const tr = document.createElement('tr');

	const create = (element) => {
		for (let h = 0, length = section.length; h < length; h++) {
			const el = document.createElement(element);
			el.appendChild(document.createTextNode(section[h]));
			tr.appendChild(el);
			table.appendChild(tr);
		}
	}

	return (type) => {
		switch (type) {
			case 'titles': {
				create('th');
				break;
			}
			case 'aggregations': {
				create('td');
				break;
			}
		}
	}	
}

function select(element) {
	const range = document.createRange();
	const selection = window.getSelection();

	selection.removeAllRanges();
	range.selectNodeContents(element);
	selection.addRange(range);

	document.execCommand('copy');
}