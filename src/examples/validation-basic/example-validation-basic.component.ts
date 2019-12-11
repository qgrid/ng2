import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';
import { Atom, DataService } from '../data.service';

@Component({
	selector: 'example-validation-basic',
	templateUrl: 'example-validation-basic.component.html',
	styleUrls: ['example-validation-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleValidationBasicComponent {
	static id = 'validation-basic';

	@ViewChild(GridComponent) myGrid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	checkNumber(v) {
		const isValid = v > 1800 && v % 2 === 0;
		if (!isValid) {
			return 'Should be > 1800 and even';
		}
	}
}
