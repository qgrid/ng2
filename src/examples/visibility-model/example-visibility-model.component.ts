import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-visibility-model',
	templateUrl: 'example-visibility-model.component.html',
	styleUrls: ['example-visibility-model.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleVisibilityStateComponent implements AfterViewInit {
	static id = 'visibility-model';

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		const { model } = this.grid;

		model.visibility({
			toolbar: {
				bottom: false,
				left: false,
				right: false,
				top: false
			}
		});
	}
}
