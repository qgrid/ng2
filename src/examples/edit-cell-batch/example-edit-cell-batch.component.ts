import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';


@Component({
	selector: 'example-edit-cell-batch',
	templateUrl: 'example-edit-cell-batch.component.html',
	styleUrls: ['example-edit-cell-batch.component.scss'],
	providers: [DataService]
})
export class ExampleEditCellBatchComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}