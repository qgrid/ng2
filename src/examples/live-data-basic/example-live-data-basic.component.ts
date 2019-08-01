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
	timeoutId: any = null;

	constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
		this.dataService.getQuotes().subscribe(quotes => {
			this.rows = quotes;
			this.updateCells();
		});
	}

	ngOnDestroy() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
	}

	updateCells() {
		const interval = this.random(2000, 4000);
		this.timeoutId = setTimeout(() => {
			this.rows.forEach(quote => {
				const hasChanges = this.random(0, 5);
				if (hasChanges) {
					const rnd = this.random(-50, 50);
					quote.last += rnd;
					quote.ask += rnd;
				}
			});

			this.cd.markForCheck();
			this.cd.detectChanges();

			this.updateCells();
		}, interval);
	}

	random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}
