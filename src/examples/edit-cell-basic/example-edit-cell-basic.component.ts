import {Component, ChangeDetectionStrategy} from '@angular/core';
import {DataService, Human} from '../data.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'example-edit-cell-basic',
	templateUrl: 'example-edit-cell-basic.component.html',
	styleUrls: ['example-edit-cell-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleEditCellBasicComponent {

	static id = 'edit-cell-basic';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

}
