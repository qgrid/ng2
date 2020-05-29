import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-alt-basic',
	templateUrl: 'example-alt-basic.component.html',
	styleUrls: ['example-alt-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAltBasicComponent {
	static id = 'alt-basic';

	rows$: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows$ = dataService.getPeople();
	}
}
