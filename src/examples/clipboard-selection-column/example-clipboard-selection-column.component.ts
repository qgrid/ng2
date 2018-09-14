import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-clipboard-selection-column',
	templateUrl: 'example-clipboard-selection-column.component.html',
	styleUrls: ['example-clipboard-selection-column.component.scss'],
	providers: [DataService]
})
export class ExampleClipboardSelectionColumnComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
