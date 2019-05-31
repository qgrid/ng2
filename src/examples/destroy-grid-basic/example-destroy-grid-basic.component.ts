import {Component, ChangeDetectionStrategy} from '@angular/core';
import {DataService, Human} from '../data.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'example-destroy-grid-basic',
	templateUrl: 'example-destroy-grid-basic.component.html',
	styleUrls: ['example-destroy-grid-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDestroyGridBasicComponent {

	static id = 'destroy-grid-basic';

	rows: Observable<Human[]>;
	isVisible = true;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

}
