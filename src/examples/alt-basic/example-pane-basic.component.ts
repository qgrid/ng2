import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-pane-basic',
	templateUrl: 'example-pane-basic.component.html',
	styleUrls: ['example-pane-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePaneBasicComponent {
	static id = 'pane-basic';

	rows$: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows$ = dataService.getPeople();
	}
}
