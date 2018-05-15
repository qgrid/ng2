import {flatView} from '@grid/core/export/export.service';

export class Pdf {
	constructor(jsPDF) {
		this.jsPDF = jsPDF;
	}
	write(rows, columns, name) {
		const jsPDF = this.jsPDF;
		const titles = [];
		const values = [];
		const doc = new jsPDF({orientation: 'landscape', unit: 'in'});
		const tableOptions = {
			styles: {
				overflow: 'linebreak',
				fontSize: 8,
				columnWidth: 'auto',
				overflowColumns: true
			},
			headerStyles: {
				overflow: 'ellipsize',
			},
			pageBreak: 'auto',
			margin: 0
		};
		for (let column of columns) {
			titles.push({title: column.title, dataKey: column.path});
		}
		for (let row of rows) {
			values.push(flatView(row));
		}

		doc.autoTable(titles, values, tableOptions);
		doc.save(`${name}.pdf`);
	}
}