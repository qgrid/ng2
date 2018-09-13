import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-clipboard-basic',
	templateUrl: 'example-clipboard-basic.component.html',
	styleUrls: ['example-clipboard-basic.component.scss'],
	providers: [DataService]
})
export class ExampleClipboardBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
