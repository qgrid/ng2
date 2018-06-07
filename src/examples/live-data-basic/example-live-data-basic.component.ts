import { Component, ViewChild, ViewChildren } from '@angular/core';
import { DataService, Quote } from '../data.service';
import { Observable } from 'rxjs';

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

	update() {
		const interval = this.random(2000, 5000);
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