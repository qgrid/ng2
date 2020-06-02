import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-select-row-basic',
	templateUrl: 'example-select-row-range.component.html',
	styleUrls: ['example-select-row-range.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectRowRangeComponent {
	static id = 'select-row-range';

	rows$: Observable<Human[]> = this.dataService.getPeople();

	constructor(private dataService: DataService) {
	}
}
