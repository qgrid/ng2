import {Component, ChangeDetectionStrategy, ViewChild, AfterViewInit} from '@angular/core';
import {DataService, Human} from '../data.service';
import {Observable} from 'rxjs';
import {GridComponent, Command} from 'ng2-qgrid';

@Component({
	selector: 'example-select-row-disable',
	templateUrl: 'example-select-row-disable.component.html',
	styleUrls: ['example-select-row-disable.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSelectRowDisableComponent implements AfterViewInit {

	static id = 'select-row-disable';

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

	ngAfterViewInit() {
		const {model} = this.grid;

		model.selection({
			toggle: new Command({
				canExecute: ({items}) => items.length === 1 && items[0].gender === 'male',
			}),
		});
	}

}
