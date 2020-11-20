import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DataService, Quote } from '../data.service';
import { interval, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

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

	private destroy$: Subject<void> = new Subject();

	constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
		this.dataService.getQuotes().subscribe(quotes => {
			this.rows = quotes;
			this.cd.detectChanges();

			interval(300).pipe(
				takeUntil(this.destroy$),
				throttleTime(this.random(0, 5000)),
			).subscribe(() => {
				const idx = this.random(0, this.rows.length - 1);
				this.updateQuote(idx);
			});
		});
	}

	updateQuote(idx: number) {
		const rows = [ ...this.rows ];
		const quote = rows[idx];
		const rnd = this.random(-50000, 50000);
		quote.last += rnd;
		quote.ask += rnd;
		quote.ldn1 = this.randomTime(quote.ldn1);

		this.rows = rows;
	}

	random(min: number, max: number): number {
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
		this.destroy$.next();
	}
}
