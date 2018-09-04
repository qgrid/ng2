import { Component, ViewChild, ViewChildren } from '@angular/core';
import { DataService, Quote } from '../data.service';
import { Observable } from 'rxjs';
import { Column, StyleCellContext } from 'ng2-qgrid';

@Component({
	selector: 'example-live-data-basic',
	templateUrl: 'example-live-data-basic.component.html',
	styleUrls: ['example-live-data-basic.component.scss'],
	providers: [DataService]
})
export class ExampleLiveDataBasicComponent {
	rows: Quote[];

	constructor(dataService: DataService) {
		dataService.getQuotes().subscribe(quotes => {
			this.rows = quotes;
			this.update();
		});
	}

	diff(cell) {
		const row = cell.$row;
		return row.last - row.previous;
	}

	styleCell(row: Quote, column: Column, context: StyleCellContext) {
		if (column.key === 'last') {
			const d = this.diff({ $row: row });
			if (d !== 0) {
				context.class(d > 0 ? 'positive' : 'negative');
			}
		}
	}

	update() {
		const interval = this.random(200, 2000);
		setTimeout(() => {
			this.rows.forEach(quote => {
				const hasChanges = this.random(0, 2);
				if (hasChanges) {
					const rnd = this.random(-5, 5);
					quote.last = quote.last + rnd;
				}
			});

			this.update();
		}, interval);
	}

	random(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}