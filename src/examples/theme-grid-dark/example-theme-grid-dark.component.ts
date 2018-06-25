import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-theme-grid-dark',
	templateUrl: 'example-theme-grid-dark.component.html',
	styleUrls: ['example-theme-grid-dark.component.scss'],
	providers: [DataService]
})
export class ExampleThemeGridDarkComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}