import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-pivot-column-template',
	templateUrl: 'example-pivot-column-template.component.html',
	styleUrls: ['example-pivot-column-template.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePivotColumnTemplateComponent {
	static id = 'pivot-column-template';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
