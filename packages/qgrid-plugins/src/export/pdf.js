import { graphFlatView } from '@qgrid/core';

export class PdfWriter {
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
        overflowColumns: true,
      },
      headerStyles: {
        overflow: 'ellipsize',
      },
      pageBreak: 'auto',
      margin: 0,
    };
    for (const column of columns) {
      titles.push({title: column.title, dataKey: column.path});
    }
    for (const row of rows) {
      values.push(graphFlatView(row));
    }

    doc.autoTable(titles, values, tableOptions);
    doc.save(`${name}.pdf`);
  }
}
