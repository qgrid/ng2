import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-on-push-basic',
	templateUrl: 'example-on-push-basic.component.html',
	styleUrls: ['example-on-push-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleOnPushBasicComponent implements AfterViewInit {
	@ViewChild(GridComponent) myGrid: GridComponent;

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			const { rows } = this.myGrid.model.data();
			if (rows.length) {
				rows[0].number = rows[0].number + 1;
			}
		}, 1000);
	}
}
