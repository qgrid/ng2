import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-column-list-basic',
	templateUrl: 'example-column-list-basic.component.html',
	styleUrls: ['example-column-list-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnListBasicComponent {
	static id = 'column-list-basic';

	group = '';
	rows$: Observable<Human[]> = this.dataService.getPeople();

	constructor(private dataService: DataService) {}
}
