import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'on-push-basic',
	'On push change detection is enabled'
];

@Component({
	selector: 'example-on-push-basic',
	templateUrl: 'example-on-push-basic.component.html',
	styleUrls: ['example-on-push-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleOnPushBasicComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			const { rows } = this.grid.model.data();
			if (rows.length) {
				rows[0].number = rows[0].number + 1;
			}
		}, 1000);
	}
}
