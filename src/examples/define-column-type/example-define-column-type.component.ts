import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Column } from 'ng2-qgrid';

@Component({
	selector: 'example-define-column-type',
	templateUrl: 'example-define-column-type.component.html',
	styleUrls: ['example-define-column-type.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDefineColumnTypeComponent {
	static id = 'define-column-type';

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
