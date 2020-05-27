import { DataService, Human } from '../data.service';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { GridComponent } from 'ng2-qgrid';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-column-visibility-basic',
	templateUrl: 'example-column-visibility-basic.component.html',
	styleUrls: ['example-column-visibility-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnColumnVisibilityBasicComponent {
	static id = 'column-visibility-basic';

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
