import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-scroll-virtual-selection',
	templateUrl: 'example-scroll-virtual-selection.component.html',
	styleUrls: ['example-scroll-virtual-selection.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleScrollVirtualSelectionComponent {
	static id = 'scroll-virtual-selection';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
