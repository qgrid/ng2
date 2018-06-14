import { Component } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';
import { map } from 'rxjs/internal/operators';

@Component({
	selector: 'example-master-details-basic',
	templateUrl: 'example-master-details-basic.component.html',
	styleUrls: ['example-master-details-basic.component.scss'],
	providers: [DataService]
})
export class ExampleMasterDetailsBasicComponent {
	gridModel: GridModel;
	rows: Observable<Human[]>;
	detailsRows: Observable<Human[]>;
	likes: string[] = [];

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();
		this.rows = dataService.getPeople();

		this.gridModel.selectionChanged.watch(e => {
			const items = e.state.items;
			if (items.length) {
				this.likes = items[0].likes;

				this.detailsRows = dataService.getPeople().pipe(
					map(humans =>
						humans.filter(human =>
							this.likes.every(like => human.likes.indexOf(like) >= 0)))
				);
			}
		});
	}
}
