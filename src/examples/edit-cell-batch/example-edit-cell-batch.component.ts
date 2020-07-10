import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'edit-cell-batch',
	'Cell data can be changed using drag and drop (bottom right corner of the cell)'
];

@Component({
	selector: 'example-edit-cell-batch',
	templateUrl: 'example-edit-cell-batch.component.html',
	styleUrls: ['example-edit-cell-batch.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleEditCellBatchComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
