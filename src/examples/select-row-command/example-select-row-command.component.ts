import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, Command } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'select-row-command',
	'Rows can be selected using checkboxes. Only one row can be selected in the same time'
];

@Component({
	selector: 'example-select-row-command',
	templateUrl: 'example-select-row-command.component.html',
	styleUrls: ['example-select-row-command.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectRowCommandComponent implements AfterViewInit {
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
				canExecute: e => {
					return e.items[0] !== model.selection().items[0];
				}
			})
		});
	}
}
