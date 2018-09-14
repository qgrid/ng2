import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-clipboard-selection-row',
	templateUrl: 'example-clipboard-selection-row.component.html',
	styleUrls: ['example-clipboard-selection-row.component.scss'],
	providers: [DataService]
})
export class ExampleClipboardSelectionRowComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
