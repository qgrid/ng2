import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-select-row-single-only',
	templateUrl: 'example-select-row-single-only.component.html',
	styleUrls: ['example-select-row-single-only.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectRowSingleOnlyComponent {
	static id = 'select-row-single-only';

	rows$: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows$ = dataService.getAtoms();
	}
}
