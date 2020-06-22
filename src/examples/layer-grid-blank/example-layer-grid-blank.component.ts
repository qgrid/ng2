import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'layer-grid-blank',
	'Table is empty on startup and data can be loaded using "Load data" button'
];

@Component({
	selector: 'example-layer-grid-blank',
	templateUrl: 'example-layer-grid-blank.component.html',
	styleUrls: ['example-layer-grid-blank.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleLayerGridBlankComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(private dataService: DataService) {
	}

	loadData() {
		this.rows = this.dataService.getAtoms();
	}
}
