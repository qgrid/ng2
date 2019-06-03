import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-theme-grid-dark',
	templateUrl: 'example-theme-grid-dark.component.html',
	styleUrls: ['example-theme-grid-dark.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleThemeGridDarkComponent {
	static id = 'theme-grid-dark';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
