import { DataService, Human } from '../data.service';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { GridComponent } from 'ng2-qgrid';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'column-visibility-basic',
	'Columns can be hidden/shown using UI buttons'
];

@Component({
	selector: 'example-column-visibility-basic',
	templateUrl: 'example-column-visibility-basic.component.html',
	styleUrls: ['example-column-visibility-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnColumnVisibilityBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows$: Observable<Human[]> = this.dataService.getPeople();

	showLastName = true;
	showFirstName = true;

	@ViewChild(GridComponent) grid: GridComponent;

	constructor(private dataService: DataService) {
	}

	hideCity() {
		const { model } = this.grid;
		const columns = model.data().columns.filter(x => x.key !== 'city');

		model.columnList({ columns });
		model.data({ columns });
	}
}
