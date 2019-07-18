import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { DataService, Quote } from '../data.service';

@Component({
	selector: 'example-live-data-basic',
	templateUrl: 'example-live-data-basic.component.html',
	styleUrls: ['example-live-data-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ExampleLiveDataBasicComponent {
	static id = 'live-data-basic';

	rows: Quote[];

	constructor(dataService: DataService, private cd: ChangeDetectorRef) {
		dataService.getQuotes().subscribe(quotes => {
			this.rows = quotes;
			this.update();
		});
	}

	update() {

		const interval = this.random(2000, 4000);
		setTimeout(() => {
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

			this.cd.markForCheck();
			this.cd.detectChanges();

			this.update();
		}, interval);
	}

	randomTime(time: string): string {
		if (time.indexOf(':') === -1) {
			return time;
		}
		const timeArr = time.split(':').map((val, i) => {
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
