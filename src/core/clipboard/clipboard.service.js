import { isUndefined } from '../utility/kit';

export class ClipboardService {
	static copy(selector) {
		const table = createTable(selector);
		select(table);
		table.remove();
	}
}

function createTable(selector) {
	const { titles, readings, aggregations } = selector.chunks;
	const { source } = selector;
	const table = document.createElement('table');

	const gotTitles = source.indexOf('head') >= 0;
	const gotAggregations = source.indexOf('foot') >= 0;

	let titleFlag = true;
	let aggregationFlag = false;

	for (let i = 0, rowLength = readings.length; i < rowLength; i++) {
		const tr = document.createElement('tr');
		const row = readings[i];
		const last = i === rowLength - 1;

		if (last) {
			aggregationFlag = true;
		}

		if (gotTitles && titleFlag) {
			const create = addSection(table, titles);
			create('titles');
			titleFlag = false;
		}

		for (let k = 0, max = row.length; k < max; k++) {
			const td = document.createElement('td');
			td.appendChild(document.createTextNode(row[k]));
			tr.appendChild(td);
		}

		table.appendChild(tr);

		if (gotAggregations && aggregationFlag) {
			const create = addSection(table, aggregations);
			create('aggregations');
			aggregationFlag = false;
		}
	}

	table.classList.add('q-grid-clipboard');
	document.body.appendChild(table);

	return table;
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