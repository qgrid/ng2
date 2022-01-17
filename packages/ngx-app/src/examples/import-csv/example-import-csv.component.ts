import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService, Atom } from '../data.service';

const EXAMPLE_TAGS = [
	'import-csv',
	'Table data can be imported from csv'
];

@Component({
	selector: 'example-import-csv',
	templateUrl: 'example-import-csv.component.html',
	styleUrls: ['example-import-csv.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleImportCsvComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]> = of([]);
}
