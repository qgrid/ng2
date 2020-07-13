import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Column } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'define-column-hybrid',
	'Columns can be created both in html and typescript'
];

@Component({
	selector: 'example-define-column-hybrid',
	templateUrl: 'example-define-column-hybrid.component.html',
	styleUrls: ['example-define-column-hybrid.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDefineColumnHybridComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;
	columns: Column[] = [{
		key: 'mass',
		title: 'should be js Mass'
	}, {
		key: 'symbol',
		title: 'shouldnt be js Symbol',
		width: 200
	}];

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
