import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-visibility-basic',
	templateUrl: 'example-visibility-basic.component.html',
	styleUrls: ['example-visibility-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleVisibilityBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
