import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Column } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'define-column-type',
	'Column type can be defined in typescript'
];

@Component({
	selector: 'example-define-column-type',
	templateUrl: 'example-define-column-type.component.html',
	styleUrls: ['example-define-column-type.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDefineColumnTypeComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;
	columns: Column[] = [{
		key: 'number',
		type: 'number'
	}, {
		key: 'symbol',
		type: 'number'
	}];

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
