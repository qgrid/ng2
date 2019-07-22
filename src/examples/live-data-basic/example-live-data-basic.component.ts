import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DataService, Quote } from '../data.service';

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

	rows: Quote[];
	rowsUpdatesCounter = 0;
	timeoutId: any = null;
	rowsTimeoutId: any = null;

	constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
		this.updateRows(true);
	}

	ngOnDestroy() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
		if (this.rowsTimeoutId) {
			clearTimeout(this.rowsTimeoutId);
		}
	}

	updateRows(immediately = false) {
		const interval = immediately ? 0 : this.random(10000, 15000);

		this.rowsTimeoutId = setTimeout(() => {
			this.dataService.getQuotes().subscribe(quotes => {
				quotes.push(quotes[this.random(0, quotes.length)]);
				quotes.push(quotes[this.random(0, quotes.length)]);
				this.rows = quotes.sort((a, b) => {
					const factor = this.rowsUpdatesCounter % 2 === 0 ? -1 : 1;
					return a.metal.toLowerCase() >= b.metal.toLowerCase() ? factor * 1 : factor * (-1);
				});
				this.rows.push(this.rows[this.random(0, this.rows.length)]);
				this.updateCells(true);
			});
			this.rowsUpdatesCounter++;
			this.updateRows();

			this.cd.markForCheck();
			this.cd.detectChanges();

		}, interval);

	}

	updateCells(immediately = false) {

		const interval = immediately ? 0 : this.random(2000, 4000);
		this.timeoutId = setTimeout(() => {
			this.rows.forEach(quote => {
				const hasChanges = this.random(0, 7);
				if (hasChanges) {
					const rnd = this.random(-50, 50);
					quote.last += rnd;
					quote.ask += rnd;
					quote.ldn1 = this.randomTime(quote.ldn1);
					quote.ldn2 = this.randomTime(quote.ldn2);
				}
			});

			// if (!this.random(0, 5)) {
			// 	this.rows.push(this.rows[this.random(0, this.rows.length)]);
			// 	console.log(`added row`);
			// }
			// console.log(this.rows.length);

			this.cd.markForCheck();
			this.cd.detectChanges();

			this.updateCells();
		}, interval);
	}

	randomTime(time: string): string {
		if (time.indexOf(':') === -1) {
			return time;
		}
		const timeArr = time.split(':').map((val, i) => {
			// tslint:disable-next-line: radix
			let num = parseInt(val);
			if (i === 0) {
				num += this.random(-5, 5);
				if (num > 23 || num < 0) {
					num = Math.sqrt(Math.pow(num % 24, 2));
				}
			} else if (i === 1) {
				num += this.random(-20, 20);
				if (num > 59 || num < 0) {
					num = Math.sqrt(Math.pow(num % 60, 2));
				}
			}
			return num.toString().padStart(2, '0');
		});
		return timeArr.join(':');
	}

	random(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}
