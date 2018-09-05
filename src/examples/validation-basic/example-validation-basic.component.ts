import { Component, ViewChild } from '@angular/core';

import { Atom, DataService } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-validation-basic',
	templateUrl: 'example-validation-basic.component.html',
	styleUrls: [ 'example-validation-basic.component.scss' ],
	providers: [ DataService ]
})
export class ExampleValidationBasicComponent {
	@ViewChild(GridComponent) myGrid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
