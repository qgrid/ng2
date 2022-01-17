import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Quote } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-look-quotes-basic',
	templateUrl: 'example-look-quotes-basic.component.html',
	styleUrls: ['example-look-quotes-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleLookQuotesBasicComponent {
	static id = 'look-quotes-basic';

	rows: Observable<Quote[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getQuotes();
	}
}
