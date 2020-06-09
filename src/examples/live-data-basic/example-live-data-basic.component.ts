import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DataService, Quote } from '../data.service';

const EXAMPLE_TAGS = [
	'live-data-basic',
	'Table data updates in real time'
];

@Component({
	selector: 'example-live-data-basic',
	templateUrl: 'example-live-data-basic.component.html',
	styleUrls: ['example-live-data-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ExampleLiveDataBasicComponent implements OnDestroy {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Quote[];
	timeoutId: any = null;

	constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
		this.dataService.getQuotes().subscribe(quotes => {
			this.rows = quotes;
			this.update(true);
		});
	}

	update(immediately = false) {
		this.timeoutId = setTimeout(() => {
			const rows = Array.from(this.rows);
			rows.forEach(quote => {
				const hasChanges = this.random(0, 5);
				if (hasChanges) {
					const rnd = this.random(-50000, 50000);
					quote.last += rnd;
					quote.ask += rnd;
					quote.ldn1 = this.randomTime(quote.ldn1);
				}
			});

			this.rows = rows;
			this.cd.markForCheck();
			this.cd.detectChanges();
			this.update();
		}, immediately ? 0 : this.random(2000, 4000));
	}

	random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	randomTime(time: string): string {
		if (time.indexOf(':') === -1) {
			return time;
		}
		return time.split(':').map((val, i) => {
			let num = +val;
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
		}).join(':');
	}

	ngOnDestroy() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
	}
}
