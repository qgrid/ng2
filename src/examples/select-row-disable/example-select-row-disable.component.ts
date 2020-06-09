import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, Command } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'select-row-disable',
	'Rows can be selected using checkboxes. Some rows are disabled'
];

@Component({
	selector: 'example-select-row-disable',
	templateUrl: 'example-select-row-disable.component.html',
	styleUrls: ['example-select-row-disable.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectRowDisableComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

	ngAfterViewInit() {
		const { model } = this.grid;

		model.selection({
			toggle: new Command({
				canExecute: ({ items }) => items.length === 1 && items[0].gender === 'male'
			})
		});
	}
}
