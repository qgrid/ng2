import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';
import { map } from 'rxjs/operators';

const EXAMPLE_TAGS = [
	'master-details-basic',
	'Bottom table shows data, related to selected row from upper table'
];

@Component({
	selector: 'example-master-details-basic',
	templateUrl: 'example-master-details-basic.component.html',
	styleUrls: ['example-master-details-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleMasterDetailsBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows$: Observable<Human[]>;
	detailsRows$: Observable<Human[]>;

	gridModel: GridModel;
	likes: string[] = [];

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();
		this.rows$ = dataService.getPeople();

		this.gridModel
			.selectionChanged
			.watch(e => {
				if (e.hasChanges('items')) {
					const { items } = e.state;
					if (items.length) {
						this.likes = items[0].likes;

						this.detailsRows$ = dataService
							.getPeople()
							.pipe(
								map(people => people
									.filter(human => this.likes
										.every(like => human.likes.indexOf(like) >= 0)))
							);
					}
				}
			});
	}
}
