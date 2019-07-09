import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DataService, Quote } from '../data.service';
import { Column, StyleCellContext } from 'ng2-qgrid';

function diff(cell) {
	const row = cell.$row;
	return row.last - row.previous;
}

@Component({
	selector: 'example-live-data-basic',
	templateUrl: 'example-live-data-basic.component.html',
	styleUrls: ['example-live-data-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ExampleLiveDataBasicComponent implements OnDestroy {
	static id = 'live-data-basic';

	private isLive = true;

	rows: Quote[];

	constructor(dataService: DataService, private cd: ChangeDetectorRef) {
		dataService.getQuotes().subscribe(quotes => {
			this.rows = quotes;
			this.update();
		});
	}

	update() {
		if (!this.isLive) {
			return;
		}

		const interval = 4000; // this.random(200, 2000);
		setTimeout(() => {
			this.rows.forEach(quote => {
				const hasChanges = this.random(0, 5);
				if (hasChanges) {
					const rnd = this.random(-5, 5);
					quote.last = quote.last + rnd;
				}
			});

			this.rows = Array.from(this.rows);
			this.cd.markForCheck();
			this.cd.detectChanges();
			this.update();
		}, interval);
	}

	random(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	ngOnDestroy() {
		this.isLive = false;
	}
}
