import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-clipboard-selection-cell',
	templateUrl: 'example-clipboard-selection-cell.component.html',
	styleUrls: ['example-clipboard-selection-cell.component.scss'],
	providers: [DataService]
})
export class ExampleClipboardSelectionCellComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
