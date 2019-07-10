import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { DataService, Quote } from '../data.service';

@Component({
	selector: 'example-live-data-basic',
	templateUrl: 'example-live-data-basic.component.html',
	styleUrls: ['example-live-data-basic.component.scss'],
	providers: [DataService],
	// changeDetection: ChangeDetectionStrategy.OnPush,
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

		const interval = 2000; // this.random(200, 2000);
		setTimeout(() => {
			this.rows.forEach(quote => {
				const hasChanges = this.random(0, 7);
				if (hasChanges) {
					const rnd = this.random(-5, 5);
					quote.last += rnd;
					quote.ask += rnd;
				}
			});

			this.cd.markForCheck();
			this.cd.detectChanges();
			
			this.update();
		}, interval);
	}

	random(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}
