import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService, Atom } from '../data.service';

@Component({
	selector: 'example-import-csv',
	templateUrl: 'example-import-csv.component.html',
	styleUrls: ['example-import-csv.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleImportCsvComponent {
	static id = 'import-csv';

	rows: Observable<Atom[]> = of([]);
}
