import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Column } from 'ng2-qgrid';

@Component({
	selector: 'example-define-column-hybrid',
	templateUrl: 'example-define-column-hybrid.component.html',
	styleUrls: ['example-define-column-hybrid.component.scss'],
	providers: [DataService]
})
export class ExampleDefineColumnHybridComponent {
	rows: Observable<Atom[]>;
	columns: Column[] = [{
		key: 'mass',
		title: 'js Mass'
	}, {
		key: 'symbol',
		title: 'shouldnt be js Symbol',
		width: 200
	}];

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}