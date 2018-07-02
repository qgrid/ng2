import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';


@Component({
	selector: 'example-edit-cell-basic',
	templateUrl: 'example-edit-cell-basic.component.html',
	styleUrls: ['example-edit-cell-basic.component.scss'],
	providers: [DataService]
})
export class ExampleEditCellBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}